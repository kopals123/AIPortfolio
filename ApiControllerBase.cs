using System.Threading.Tasks;
using AIPortfolio.Application.DTOs;
using AIPortfolio.Domain.Interfaces;

namespace AIPortfolio.Application.Services
{
    /// <summary>
    /// Implements portfolio context-aware Chat processing.
    /// </summary>
    public class ChatService : IChatService
    {
        private readonly IHuggingFaceService _huggingFaceService;
        private readonly IProjectRepository _projectRepository;

        public ChatService(IHuggingFaceService huggingFaceService, IProjectRepository projectRepository)
        {
            _huggingFaceService = huggingFaceService;
            _projectRepository = projectRepository;
        }

        public async Task<ChatResponseDto> GetChatResponseAsync(ChatRequestDto request)
        {
            var about = await _projectRepository.GetAboutProfileAsync();
            
            // Build the system instructions context for Hugging Face
            var systemInstructions = $"Context:\n" +
                                     $"Developer Name: {about.Name}\n" +
                                     $"Title: {about.Title}\n" +
                                     $"Location: {about.Location}\n" +
                                     $"Email: {about.Email}\n" +
                                     $"Bio: {about.Bio}\n\n" +
                                     $"Instructions: You are the AI Assistant representing {about.Name}. Answer the following question using the context above in a helpful and highly professional manner.\n" +
                                     $"Question: {request.Message}\n" +
                                     $"Answer:";

            var response = await _huggingFaceService.GenerateResponseAsync(systemInstructions);

            return new ChatResponseDto
            {
                Response = response
            };
        }
    }
}
