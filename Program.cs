using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using AIPortfolio.Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace AIPortfolio.Infrastructure.Services
{
    /// <summary>
    /// Integrates with the Hugging Face Inference API with retry logic and error handling.
    /// </summary>
    public class HuggingFaceService : IHuggingFaceService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<HuggingFaceService> _logger;
        private readonly string _apiKey;
        private const string ModelUrl = "https://api-inference.huggingface.co/models/gpt2"; // Standard text generation model

        public HuggingFaceService(HttpClient httpClient, IConfiguration configuration, ILogger<HuggingFaceService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
            _apiKey = configuration["HUGGING_FACE_API_KEY"] ?? string.Empty;

            // Configure HTTP Client
            _httpClient.Timeout = TimeSpan.FromSeconds(15);
            if (!string.IsNullOrEmpty(_apiKey))
            {
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _apiKey);
            }
        }

        public async Task<string> GenerateResponseAsync(string prompt)
        {
            var payload = new { inputs = prompt, parameters = new { max_new_tokens = 150, temperature = 0.7 } };

            int attempt = 0;
            const int maxRetry = 2;

            while (attempt < maxRetry)
            {
                attempt++;
                try
                {
                    _logger.LogInformation("Sending request to Hugging Face API. Attempt {Attempt}", attempt);
                    var response = await _httpClient.PostAsJsonAsync(ModelUrl, payload);

                    if (response.IsSuccessStatusCode)
                    {
                        var jsonString = await response.Content.ReadAsStringAsync();
                        using var doc = JsonDocument.Parse(jsonString);
                        var root = doc.RootElement;

                        if (root.ValueKind == JsonValueKind.Array && root.GetArrayLength() > 0)
                        {
                            var generatedText = root[0].GetProperty("generated_text").GetString();
                            if (!string.IsNullOrEmpty(generatedText))
                            {
                                // Remove prompt from response text if repeated
                                if (generatedText.StartsWith(prompt))
                                {
                                    return generatedText.Substring(prompt.Length).Trim();
                                }
                                return generatedText.Trim();
                            }
                        }
                        return "Invalid response format received from AI backend.";
                    }

                    _logger.LogWarning("Hugging Face API returned status code: {StatusCode}. Attempt {Attempt}", response.StatusCode, attempt);

                    if (response.StatusCode == System.Net.HttpStatusCode.TooManyRequests)
                    {
                        if (attempt < maxRetry)
                        {
                            _logger.LogWarning("Rate limited. Retrying in 2 seconds...");
                            await Task.Delay(2000);
                            continue;
                        }
                        return "AI backend rate limit exceeded. Please try again later.";
                    }

                    if ((int)response.StatusCode >= 500 && attempt < maxRetry)
                    {
                        _logger.LogWarning("Server-side issue. Retrying in 1 second...");
                        await Task.Delay(1000);
                        continue;
                    }
                }
                catch (TaskCanceledException ex)
                {
                    _logger.LogError(ex, "Timeout elapsed while contacting Hugging Face API.");
                    if (attempt < maxRetry) continue;
                    return "AI request timed out. Please try again.";
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to call Hugging Face Inference API.");
                    if (attempt < maxRetry) continue;
                    return "An unexpected error occurred while communicating with the AI service.";
                }
            }

            return "Could not fetch AI generated answer due to recurring issues.";
        }
    }
}
