using AIPortfolio.Models;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace AIPortfolio.Services
{
    public class ChatService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public ChatService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<string> GetChatResponseAsync(ChatRequest request)
        {
            var apiKey = _configuration["HuggingFace:ApiKey"];
            var model = _configuration["HuggingFace:Model"] ?? "HuggingFaceH4/zephyr-7b-beta";

            if (string.IsNullOrEmpty(apiKey))
                throw new InvalidOperationException("Hugging Face API Key is not configured.");

            var endpoint = $"https://api-inference.huggingface.co/models/{model}";

            var payload = new
            {
                inputs = request.Message,
                parameters = new { temperature = 0.7 }
            };

            var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            var response = await _httpClient.PostAsync(endpoint, content);

            if (!response.IsSuccessStatusCode)
                throw new Exception($"Hugging Face API call failed with status code: {response.StatusCode}");

            var responseString = await response.Content.ReadAsStringAsync();

            using var jsonDoc = JsonDocument.Parse(responseString);
            var generatedText = jsonDoc.RootElement[0].GetProperty("generated_text").GetString();

            return generatedText ?? "No response from AI.";
        }
    }
}
