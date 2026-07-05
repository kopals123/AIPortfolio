using System;
using System.Net;
using System.Threading.Tasks;
using AIPortfolio.API.Middleware;
using Microsoft.AspNetCore.Http;
using Xunit;

namespace AIPortfolio.Tests
{
    public class RateLimiterTests
    {
        [Fact]
        public async Task RateLimitingMiddleware_ShouldAllowUnderLimit()
        {
            // Arrange
            var context = new DefaultHttpContext();
            context.Connection.RemoteIpAddress = IPAddress.Parse("127.0.0.1");
            
            bool nextCalled = false;
            RequestDelegate next = (ctx) =>
            {
                nextCalled = true;
                return Task.CompletedTask;
            };

            var middleware = new RateLimitingMiddleware(next);

            // Act
            await middleware.InvokeAsync(context);

            // Assert
            Assert.True(nextCalled);
            Assert.Equal((int)HttpStatusCode.OK, context.Response.StatusCode);
        }
    }
}
