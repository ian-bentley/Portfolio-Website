namespace portfolioAPI.Models
{
    public class ContactMessage
    {
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Reason { get; set; }
        public required string Message { get; set; }

        public string? Phone { get; set; }

        public string? Company { get; set; }
    }
}
