﻿namespace portfolioAPI.Models
{
    public class Email
    {
        public required string From { get; set; }
        public string? To { get; set; }
        public required string Subject { get; set; }
        public required string Body { get; set; }
    }
}
