using AIPortfolio.Models;
using AIPortfolio.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AIPortfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly ChatService _chatService;

        public ChatController(ChatService chatService)
        {
            _chatService = chatService;
        }

        [HttpPost]
        public async Task<IActionResult> Post(ChatRequest request)
        {
            var responseText = await _chatService.GetChatResponseAsync(request);

            var response = new ChatResponse { Response = responseText };

            return Ok(response);
        }
    }
}
