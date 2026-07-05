using System;
using System.Collections.Generic;

namespace AIPortfolio.Domain.Entities
{
    /// <summary>
    /// Represents a technical skill category and its list of technical items.
    /// </summary>
    public class Skill
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Category { get; set; } = string.Empty;
        public List<string> Items { get; set; } = new List<string>();
    }
}
