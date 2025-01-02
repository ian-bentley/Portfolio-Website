using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using portfolioAPI.Models;

namespace portfolioAPI.Services.EmailService
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void SendEmailAsync(Email email)
        {
            var host = _configuration.GetValue<string>("EmailServiceConfig:Host");
            var port = _configuration.GetValue<int>("EmailServiceConfig:Port");
            var username = _configuration.GetValue<string>("EmailServiceConfig:Username");
            var password = _configuration.GetValue<string>("EmailServiceConfig:Password");

            var mimeMessage = new MimeMessage();
            mimeMessage.From.Add(MailboxAddress.Parse(email.From));
            mimeMessage.To.Add(MailboxAddress.Parse(email.To));
            mimeMessage.Subject = email.Subject;
            mimeMessage.Body = new TextPart(TextFormat.Html) { Text = email.Body };

            var stmp = new SmtpClient();
            stmp.Connect(host, port, SecureSocketOptions.StartTls);
            stmp.Authenticate(username, password);
            stmp.Send(mimeMessage);
            stmp.Disconnect(true);
        }
    }
}
