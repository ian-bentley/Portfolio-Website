using portfolioAPI.Models;

namespace portfolioAPI.Services.EmailService
{
    public interface IEmailService
    {
        void SendEmailAsync(Email email);
    }
}
