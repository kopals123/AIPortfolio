namespace AIPortfolio.Services
{
    public interface IChatService
    {
        Task<string> GetChatResponseAsync(string prompt);
    }
}
