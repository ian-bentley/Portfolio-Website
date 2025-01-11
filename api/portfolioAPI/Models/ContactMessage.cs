

using System.ComponentModel.DataAnnotations;

namespace portfolioAPI.Models
{
    public class ContactMessage
    {
        [Required]
        public string? Name { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        public string? Reason { get; set; }

        [Required]
        public string? Message { get; set; }

        [Phone]
        public string? Phone { get; set; }

        public string? Company { get; set; }
    }
}
