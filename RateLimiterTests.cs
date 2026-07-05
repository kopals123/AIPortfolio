using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace AIPortfolio.API.Middleware
{
    /// <summary>
    /// Middleware to log HTTP request metadata and execution performance times.
    /// </summary>
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<RequestLoggingMiddleware> _logger;
        private const string CorrelationIdHeaderKey = "X-Correlation-ID";

        public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var stopwatch = Stopwatch.StartNew();
            var correlationId = context.Items.TryGetValue(CorrelationIdHeaderKey, out var corrId) ? corrId : "unknown";

            var request = context.Request;
            _logger.LogInformation("[REQUEST] CorrelationID: {CorrelationID} | Method: {Method} | Path: {Path}",
                correlationId, request.Method, request.Path);

            await _next(context);

            stopwatch.Stop();
            _logger.LogInformation("[RESPONSE] CorrelationID: {CorrelationID} | Status: {Status} | Elapsed: {Elapsed}ms",
                correlationId, context.Response.StatusCode, stopwatch.ElapsedMilliseconds);
        }
    }
}
