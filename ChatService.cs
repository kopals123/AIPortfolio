using System.Threading.Tasks;

namespace AIPortfolio.Domain.Interfaces
{
    /// <summary>
    /// Service contract for generating text responses from Hugging Face models.
    /// </summary>
    public interface IHuggingFaceService
    {
        /// <summary>
        /// Generates an AI response for the user's message using the Hugging Face Inference API.
        /// </summary>
        /// <param name="prompt">The prompt or message representing the user's request.</param>
        /// <returns>The AI generated answer string.</returns>
        Task<string> GenerateResponseAsync(string prompt);
    }
}
