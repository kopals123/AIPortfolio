using System.Threading.Tasks;
using AIPortfolio.Application.DTOs;
using AIPortfolio.Application.Services;
using AIPortfolio.Domain.Entities;
using AIPortfolio.Domain.Interfaces;
using Xunit;

namespace AIPortfolio.Tests
{
    public class ChatServiceTests
    {
        [Fact]
        public async Task GetChatResponseAsync_ShouldReturnGeneratedResponse()
        {
            // Arrange
            var mockHuggingFaceService = new FakeHuggingFaceService("Hello from Fake AI");
            var mockProjectRepository = new FakeProjectRepository();
            var chatService = new ChatService(mockHuggingFaceService, mockProjectRepository);
            var request = new ChatRequestDto { Message = "What are your skills?" };

            // Act
            var result = await chatService.GetChatResponseAsync(request);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("Hello from Fake AI", result.Response);
        }
    }

    // Hand-rolled Fakes for robust unit testing without external Moq library dependencies
    public class FakeHuggingFaceService : IHuggingFaceService
    {
        private readonly string _responseToReturn;

        public FakeHuggingFaceService(string responseToReturn)
        {
            _responseToReturn = responseToReturn;
        }

        public Task<string> GenerateResponseAsync(string prompt)
        {
            return Task.FromResult(_responseToReturn);
        }
    }

    public class FakeProjectRepository : IProjectRepository
    {
        public Task<IEnumerable<Project>> GetProjectsAsync()
        {
            return Task.FromResult<IEnumerable<Project>>(new List<Project>());
        }

        public Task<IEnumerable<Skill>> GetSkillsAsync()
        {
            return Task.FromResult<IEnumerable<Skill>>(new List<Skill>());
        }

        public Task<AboutProfile> GetAboutProfileAsync()
        {
            return Task.FromResult(new AboutProfile
            {
                Name = "Alex Mercer",
                Title = "Lead Software Engineer",
                Bio = "Fake Bio",
                Location = "San Francisco, CA"
            });
        }
    }
}
