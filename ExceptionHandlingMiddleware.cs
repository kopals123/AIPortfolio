using System.Threading.Tasks;
using AIPortfolio.Application.DTOs;

namespace AIPortfolio.Application.Services
{
    /// <summary>
    /// Service contract for handling user-portfolio conversational chat logic.
    /// </summary>
    public interface IChatService
    {
        Task<ChatResponseDto> GetChatResponseAsync(ChatRequestDto request);
    }
}
