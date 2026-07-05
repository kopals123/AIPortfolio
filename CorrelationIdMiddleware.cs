using System.ComponentModel.DataAnnotations;

namespace AIPortfolio.Application.DTOs
{
    /// <summary>
    /// Data transfer object for the Chat requests.
    /// </summary>
    public class ChatRequestDto
    {
        [Required(ErrorMessage = "The Message field is required.")]
        [StringLength(1000, MinimumLength = 1, ErrorMessage = "Message must be between 1 and 1000 characters.")]
        public string Message { get; set; } = string.Empty;
    }
}
