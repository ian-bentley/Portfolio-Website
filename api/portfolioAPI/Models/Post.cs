namespace portfolioAPI.Models
{
    public class Post
    {
        public required string Title { get; set; }
        public required string Link { get; set; }
        public required string Author { get; set; }
        public required string Description { get; set; }
        public required string ImageUrl { get; set; }
        public string? ImageAlt { get; set; }
    }
}
