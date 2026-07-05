using System;
using System.Collections.Concurrent;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace AIPortfolio.API.Middleware
{
    /// <summary>
    /// Middleware to limit requests per IP address to 25 requests per minute.
    /// </summary>
    public class RateLimitingMiddleware
    {
        private readonly RequestDelegate _next;
        private static readonly ConcurrentDictionary<string, ClientLimit> Clients = new ConcurrentDictionary<string, ClientLimit>();
        private const int MaxRequests = 25;
        private static readonly TimeSpan Window = TimeSpan.FromMinutes(1);

        public RateLimitingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var ipAddress = context.Connection.RemoteIpAddress?.ToString() ?? "unknown-ip";
            var now = DateTime.UtcNow;

            var clientLimit = Clients.GetOrAdd(ipAddress, _ => new ClientLimit { ResetTime = now.Add(Window), Count = 0 });

            lock (clientLimit)
            {
                if (now > clientLimit.ResetTime)
                {
                    clientLimit.ResetTime = now.Add(Window);
                    clientLimit.Count = 1;
                }
                else
                {
                    clientLimit.Count++;
                }

                if (clientLimit.Count > MaxRequests)
                {
                    context.Response.StatusCode = (int)HttpStatusCode.TooManyRequests;
                    context.Response.ContentType = "application/json";

                    var correlationId = context.Items.TryGetValue("X-Correlation-ID", out var corrId) ? corrId?.ToString() : string.Empty;
                    var errorResponse = new
                    {
                        error = "Too Many Requests",
                        message = "Rate limit exceeded. You are allowed a maximum of 25 requests per minute.",
                        correlationId = correlationId
                    };

                    var jsonString = JsonSerializer.Serialize(errorResponse);
                    context.Response.WriteAsync(jsonString);
                    return;
                }
            }

            await _next(context);
        }

        private class ClientLimit
        {
            public DateTime ResetTime { get; set; }
            public int Count { get; set; }
        }
    }
}
