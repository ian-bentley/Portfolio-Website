using System.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using portfolioAPI.Models;
using portfolioAPI.Services.EmailService;
using portfolioAPI.Services.HashService;

namespace portfolioAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnverifiedEmailsController : ControllerBase
    {
        private IConfiguration _configuration;
        private IHashService _hashService;
        private IEmailService _emailService;

        public UnverifiedEmailsController(IConfiguration configuration, IHashService hashService, IEmailService emailService)
        {
            _configuration = configuration;
            _hashService = hashService;
            _emailService = emailService;
        }

        [HttpPost]
        [Route("Add")]
        public IActionResult Add(Subscriber subscriber)
        {
            // Create a hashId
            string hashId = _hashService.getHashSha256(subscriber.Email);

            // Add email to db
            string query = "insert into dbo.unverified_emails values(@email, @hashId)";
            DataTable dataTable = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("portfolioDB");
            SqlDataReader sqlDataReader;
            using (SqlConnection sqlConnection = new SqlConnection(sqlDatasource))
            {
                sqlConnection.Open();
                using (SqlCommand sqlCommand = new SqlCommand(query, sqlConnection))
                {
                    sqlCommand.Parameters.AddWithValue("@email", subscriber.Email);
                    sqlCommand.Parameters.AddWithValue("@hashId", hashId);
                    sqlDataReader = sqlCommand.ExecuteReader();
                    dataTable.Load(sqlDataReader);
                    sqlDataReader.Close();
                    sqlConnection.Close();
                }
            }

            // Send verification email
            Email email = new()
            {
                From = _configuration.GetValue<string>("EmailServiceConfig:WebsiteEmail"),
                To = subscriber.Email,
                Subject = "Please Verify Your Email",
                Body = string.Format(@"<p>You have subscribed to http://ianbentley.me/blog. If you did not make this subscription please disregard this email. Otherwise, use the link below to subscribe.</p>
<a href='http://localhost:5173/blog/subscribe/validation/{0}/{1}'>http://localhost:5173/blog/subscribe/validation/{0}/{1}</a>", subscriber.Email, hashId)
            };
            _emailService.SendEmailAsync(email);

            return Ok();
        }
    }
}
