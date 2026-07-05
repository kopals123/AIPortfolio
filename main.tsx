using System;
using Microsoft.AspNetCore.Mvc;

namespace AIPortfolio.API.Controllers
{
    public class HealthController : ApiControllerBase
    {
        [HttpGet]
        public IActionResult GetHealth()
        {
            return Ok(new
            {
                status = "Healthy",
                time = DateTime.UtcNow.ToString("o"),
                correlationId = CorrelationId,
                version = "1.0.0"
            });
        }
    }
}
