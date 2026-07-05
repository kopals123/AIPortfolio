using System;

namespace AIPortfolio.Domain.Entities
{
    /// <summary>
    /// Represents the personal profile information of the developer.
    /// </summary>
    public class AboutProfile
    {
        public string Name { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Github { get; set; } = string.Empty;
        public string Linkedin { get; set; } = string.Empty;
        public string ResumeUrl { get; set; } = string.Empty;
        public string Avatar { get; set; } = string.Empty;
    }
}
