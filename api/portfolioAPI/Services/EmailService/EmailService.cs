using System;
using System.Diagnostics;
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
            // *********************************************************
            // * Email Service Step 1: Get connection strings          *
            // *********************************************************

            var host = _configuration.GetValue<string>("EmailServiceConfig:Host");
            var port = _configuration.GetValue<int>("EmailServiceConfig:Port");
            var username = _configuration.GetValue<string>("EmailServiceConfig:Username");
            var password = _configuration.GetValue<string>("EmailServiceConfig:Password");

            // ********************************************************
            // * Email Service Step 2: Connection string validations  *
            // ********************************************************

            // ********************************************************
            // * Email Service Step 2a: Validate host string          *
            // ********************************************************

            Debug.WriteLine("Email Service Step 2a: Validate host string");
            if (host == "")
            {
                Debug.WriteLine("Failed. Host string is blank");
                throw new Exception("Email Service Step 2a: ERROR! Host connection string is blank");
            }
            Debug.WriteLine("Success! Host string is validated");

            // ********************************************************
            // * Email Service Step 2b: Validate port number          *
            // ********************************************************

            Debug.WriteLine("Email Service Step 2b: Validate port number");
            if (port == 0)
            {
                Debug.WriteLine("Failed. Port number is blank");
                throw new Exception("Email Service Step 2b: ERROR! Port connection string is blank");
            }
            Debug.WriteLine("Success! Port number is validated");

            // ************************************************************
            // * Email Service Step 2c: Validate username string          *
            // ************************************************************

            Debug.WriteLine("Email Service Step 2c: Validate username string");
            if (username == "")
            {
                Debug.WriteLine("Failed. Username string is blank");
                throw new Exception("Email Service Step 2c: ERROR! Username connection string is blank");
            }
            Debug.WriteLine("Success! Username string is validated");

            // ************************************************************
            // * Email Service Step 2d: Validate password string          *
            // ************************************************************

            Debug.WriteLine("Email Service Step 2d: Validate password string");
            if (password == "")
            {
                Debug.WriteLine("Failed. Password string is blank");
                throw new Exception("Email Service Step 2d: ERROR! Password connection string is blank");
            }
            Debug.WriteLine("Success! Password string is validated");

            // **********************************************************
            // * Email Service Step 3: Email validations                *
            // **********************************************************
            Debug.WriteLine("Email Service Step 3: Email validations");

            // ******************************************************************
            // * Email Service Step 3a: Validate destination email              *
            // ******************************************************************
            Debug.WriteLine("Email Service Step 3a: Validate destination email");
            if (email.To == "")
            {
                Debug.WriteLine("Failed. Destination email is blank");
                throw new Exception("Email Service Step 3a: ERROR! Destination email is blank");
            }
            Debug.WriteLine("Success!. Destination email is valid");

            // ******************************************************************
            // * Email Service Step 3b: Validate sending email                  *
            // ******************************************************************
            Debug.WriteLine("Email Service Step 3b: Validate sending email");
            if (email.From == "")
            {
                Debug.WriteLine("Failed. Sending email is blank");
                throw new Exception("Email Service Step 3b: ERROR! Sending email is blank");
            }
            Debug.WriteLine("Success!. Sending email is valid");

            // ******************************************************************
            // * Email Service Step 3c: Validate subject                        *
            // ******************************************************************
            Debug.WriteLine("Email Service Step 3c: Validate subject");
            if (email.Subject == "")
            {
                Debug.WriteLine("Failed. Subject is blank");
                throw new Exception("Email Service Step 3c: ERROR! Subject is blank");
            }
            Debug.WriteLine("Success!. Subject is valid");

            // ******************************************************************
            // * Email Service Step 3d: Validate body                           *
            // ******************************************************************
            Debug.WriteLine("Email Service Step 3d: Validate body");
            if (email.Body == "")
            {
                Debug.WriteLine("Failed. Body is blank");
                throw new Exception("Email Service Step 3d: ERROR! Body is blank");
            }
            Debug.WriteLine("Success!. Body is valid");

            // ********************************************************
            // * Email Service Step 4: Build email body               *
            // ********************************************************

            Debug.WriteLine("Email Service Step 4: Build email body");
            var builder = new BodyBuilder();
            builder.HtmlBody = email.Body;
            //builder.TextBody = email.Body; //ADD AN TEXT BODY VERSION

            // ********************************************************
            // * Email Service Step 5: Create MimeMessage             *
            // ********************************************************

            Debug.WriteLine("Email Service Step 5: Create MimeMessage");
            var mimeMessage = new MimeMessage();
            mimeMessage.From.Add(MailboxAddress.Parse(email.From));
            mimeMessage.To.Add(MailboxAddress.Parse(email.To));
            mimeMessage.Subject = email.Subject;
            mimeMessage.Body = builder.ToMessageBody();

            // **************************************************************
            // * Email Service Step 6: Connect to SMTP and send email       *
            // **************************************************************

            Debug.WriteLine("Email Service Step 6: Connect to SMTP and send email");
            var stmp = new SmtpClient();
            stmp.Connect(host, port, SecureSocketOptions.StartTls);
            stmp.Authenticate(username, password);
            stmp.Send(mimeMessage);
            stmp.Disconnect(true);

            Debug.WriteLine("Success! Email Service completed.");
        }
    }
}
