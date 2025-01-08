namespace portfolioAPI.Models
{
    public class Subscriber
    {
        public string? Id { get; set; }
        public required string Email { get; set; }
        public string? HashId { get; set; }
    }
}
