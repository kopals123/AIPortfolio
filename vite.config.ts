using Microsoft.AspNetCore.Mvc;

namespace AIPortfolio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class ApiControllerBase : ControllerBase
    {
        protected string CorrelationId => HttpContext.Items.TryGetValue("X-Correlation-ID", out var value) 
            ? value?.ToString() ?? string.Empty 
            : string.Empty;
    }
}
