using System;
using System.Diagnostics;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using portfolioAPI.Models;
using portfolioAPI.Services.LogService;

namespace portfolioAPI.Services.EmailService
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogService _logService;
        private readonly string environment;

        public EmailService(IConfiguration configuration, ILogService logService)
        {
            _configuration = configuration;
            _logService = logService;
            environment = _configuration.GetValue<string>("Environment");
        }

        public void SendEmailAsync(Email email)
        {
            // *********************************************************
            // * Email Service Step 1: Get connection strings          *
            // *********************************************************

            string host;
            int port;
            string username;
            string password;

            _logService.LogInfo("Email Service Step 1: Get connection strings");
            if (environment == "DEV")
            {
                host = _configuration.GetValue<string>("EmailServiceConfigDev:Host");
                port = _configuration.GetValue<int>("EmailServiceConfigDev:Port");
                username = _configuration.GetValue<string>("EmailServiceConfigDev:Username");
                password = _configuration.GetValue<string>("EmailServiceConfigDev:Password");
            } else
            {
                host = _configuration.GetValue<string>("EmailServiceConfig:Host");
                port = _configuration.GetValue<int>("EmailServiceConfig:Port");
                username = _configuration.GetValue<string>("EmailServiceConfig:Username");
                password = _configuration.GetValue<string>("EmailServiceConfig:Password");
            }
            _logService.LogInfo("Email Service Step 1: Success! Connection strings assigned");

            // ********************************************************
            // * Email Service Step 2: Connection string validations  *
            // ********************************************************

            _logService.LogInfo("Email Service Step 2: Connection string validations");

            // ********************************************************
            // * Email Service Step 2a: Validate host string          *
            // ********************************************************

            _logService.LogInfo("Email Service Step 2a: Validate host string");

            if (host == "")
            {
                throw new Exception("Email Service Step 2a: ERROR! Host connection string is blank");
            }
            _logService.LogInfo("Email Service Step 2a: Success! Host string is validated");

            // ********************************************************
            // * Email Service Step 2b: Validate port number          *
            // ********************************************************

            _logService.LogInfo("Email Service Step 2b: Validate port number");
            if (port == 0)
            {
                throw new Exception("Email Service Step 2b: ERROR! Port connection string is blank");
            }
            _logService.LogInfo("Email Service Step 2b: Success! Port number is validated");

            // ************************************************************
            // * Email Service Step 2c: Validate username string          *
            // ************************************************************

            _logService.LogInfo("Email Service Step 2c: Validate username string");
            if (username == "")
            {
                throw new Exception("Email Service Step 2c: ERROR! Username connection string is blank");
            }
            _logService.LogInfo("Email Service Step 2c: Success! Username string is validated");

            // ************************************************************
            // * Email Service Step 2d: Validate password string          *
            // ************************************************************

            _logService.LogInfo("Email Service Step 2d: Validate password string");
            if (password == "")
            {
                throw new Exception("Email Service Step 2d: ERROR! Password connection string is blank");
            }
            _logService.LogInfo("Email Service Step 2d: Success! Password string is validated");
            _logService.LogInfo("Email Service Step 2: Success! All validations completed");

            // **********************************************************
            // * Email Service Step 3: Email validations                *
            // **********************************************************

            _logService.LogInfo("Email Service Step 3: Email validations");

            // ******************************************************************
            // * Email Service Step 3a: Validate destination email              *
            // ******************************************************************

            _logService.LogInfo("Email Service Step 3a: Validate destination email");
            if (email.To == "")
            {
                throw new Exception("Email Service Step 3a: ERROR! Destination email is blank");
            }
            _logService.LogInfo("Email Service Step 3a: Success! Destination email is valid");

            // ******************************************************************
            // * Email Service Step 3b: Validate sending email                  *
            // ******************************************************************

            _logService.LogInfo("Email Service Step 3b: Validate sending email");
            if (email.From == "")
            {
                throw new Exception("Email Service Step 3b: ERROR! Sending email is blank");
            }
            _logService.LogInfo("Email Service Step 3b: Success! Sending email is valid");

            // ******************************************************************
            // * Email Service Step 3c: Validate subject                        *
            // ******************************************************************

            _logService.LogInfo("Email Service Step 3c: Validate subject");
            if (email.Subject == "")
            {
                throw new Exception("Email Service Step 3c: ERROR! Subject is blank");
            }
            _logService.LogInfo("Email Service Step 3c: Success! Subject is valid");

            // ******************************************************************
            // * Email Service Step 3d: Validate body                           *
            // ******************************************************************

            _logService.LogInfo("Email Service Step 3d: Validate body");
            if (email.Body == "")
            {
                throw new Exception("Email Service Step 3d: ERROR! Body is blank");
            }
            _logService.LogInfo("Email Service Step 3d: Success! Body is valid");
            _logService.LogInfo("Email Service Step 3: Success! All validations complete");

            // ********************************************************
            // * Email Service Step 4: Build email body               *
            // ********************************************************

            _logService.LogInfo("Email Service Step 4: Build email body");
            var builder = new BodyBuilder();
            builder.HtmlBody = email.Body;
            //builder.TextBody = email.Body; //ADD AN TEXT BODY VERSION
            _logService.LogInfo("Email Service Step 4: Success! Email body built");

            // ********************************************************
            // * Email Service Step 5: Create MimeMessage             *
            // ********************************************************

            _logService.LogInfo("Email Service Step 5: Create MimeMessage");
            var mimeMessage = new MimeMessage();
            mimeMessage.From.Add(MailboxAddress.Parse(email.From));
            mimeMessage.To.Add(MailboxAddress.Parse(email.To));
            mimeMessage.Subject = email.Subject;
            mimeMessage.Body = builder.ToMessageBody();
            _logService.LogInfo("Email Service Step 5: Success! MimeMessage created");

            // **************************************************************
            // * Email Service Step 6: Connect to SMTP and send email       *
            // **************************************************************

            _logService.LogInfo("Email Service Step 6: Connect to SMTP and send email");
            var stmp = new SmtpClient();
            stmp.Connect(host, port, SecureSocketOptions.StartTls);
            stmp.Authenticate(username, password);
            stmp.Send(mimeMessage);
            stmp.Disconnect(true);

            _logService.LogInfo("Email Service Step 6: Success! Email Service completed.");
        }
    }
}
