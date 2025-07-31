﻿using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { status = "Healthy", time = DateTime.UtcNow });
    }
}
