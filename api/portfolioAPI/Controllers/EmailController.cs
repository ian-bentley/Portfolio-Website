using System.Data;
using System.Diagnostics;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using portfolioAPI.Models;
using portfolioAPI.Services.EmailService;

namespace portfolioAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;

        public EmailController(IEmailService emailService, IConfiguration configuration)
        {
            _emailService = emailService;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("ContactMe")]
        [Consumes("application/json")]
        public IActionResult ContactMe([FromBody] ContactMessage contactMessage)
        {
            try
            {
                // **********************************************************
                // * Sending Contact Email Step 1: Create email object      *
                // **********************************************************
                Debug.WriteLine("Sending Contact Email Step 1: Create email object");
                Email email = new()
                {
                    From = contactMessage.Email,
                    To = _configuration.GetValue<string>("EmailServiceConfig:WebsiteEmail"),
                    Subject = contactMessage.Reason,
                    Body = string.Format(@"Name: {0}
Company: {1}
Contact Email: {2}
Contact Number: {3}

{4}", contactMessage.Name, contactMessage.Company, contactMessage.Email, contactMessage.Phone, contactMessage.Message)
                };
                Debug.WriteLine("Sending Contact Email Step 1: Email object created.");
                Debug.WriteLine("Email.From: " + email.From);
                Debug.WriteLine("Email.To: " + email.To);
                Debug.WriteLine("Email.Subject: " + email.Subject);
                Debug.WriteLine("Email.Body: \n" + email.Body);

                // **********************************************************
                // * Sending Contact Email Step 2: Validations              *
                // **********************************************************
                Debug.WriteLine("Sending Contact Email Step 2: Validations");

                // ******************************************************************
                // * Sending Contact Email Step 2a: Validate destination email      *
                // ******************************************************************
                Debug.WriteLine("Sending Contact Email Step 2a: Validate destination email");
                if (email.To == "")
                {
                    Debug.WriteLine("Failed. Destination email is blank");
                    throw new Exception("Sending Contact Email Step 2a: ERROR! Destination email is blank");
                }
                Debug.WriteLine("Success!. Destination email is valid");

                // ******************************************************************
                // * Sending Contact Email Step 2b: Validate sending email          *
                // ******************************************************************
                Debug.WriteLine("Sending Contact Email Step 2b: Validate sending email");
                if (email.From == "")
                {
                    Debug.WriteLine("Failed. Sending email is blank");
                    throw new Exception("Sending Contact Email Step 2b: ERROR! Sending email is blank");
                }
                Debug.WriteLine("Success!. Sending email is valid");

                // ******************************************************************
                // * Sending Contact Email Step 2c: Validate subject                *
                // ******************************************************************
                Debug.WriteLine("Sending Contact Email Step 2a: Validate subject");
                if (email.Subject == "")
                {
                    Debug.WriteLine("Failed. Subject is blank");
                    throw new Exception("Sending Contact Email Step 2c: ERROR! Subject is blank");
                }
                Debug.WriteLine("Success!. Subject is valid");

                // ******************************************************************
                // * Sending Contact Email Step 2d: Validate body                   *
                // ******************************************************************
                Debug.WriteLine("Sending Contact Email Step 2d: Validate body");
                if (email.To == "")
                {
                    Debug.WriteLine("Failed. Body is blank");
                    throw new Exception("Sending Contact Email Step 2a: ERROR! Body is blank");
                }
                Debug.WriteLine("Success!. Body is valid");

                Debug.WriteLine("Sending Contact Email Step 2: All validations completed.");

                // **********************************************************
                // * Sending Contact Email Step 3: Send email               *
                // **********************************************************
                Debug.WriteLine("Sending Contact Email Step 3: Send email");
                _emailService.SendEmailAsync(email);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPost]
        [Route("NotifySubscribers")]
        public IActionResult NotifySubscribers([FromBody] Post post)
        {
            Queue<Subscriber> subscribers = new Queue <Subscriber>();

            // Get subscriber data
            string query = "select * from subscribers";
            DataTable dataTable = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("portfolioDB");
            SqlDataReader sqlDataReader;
            using (SqlConnection sqlConnection = new SqlConnection(sqlDatasource))
            {
                sqlConnection.Open();
                using (SqlCommand sqlCommand = new SqlCommand(query, sqlConnection))
                {
                    sqlDataReader = sqlCommand.ExecuteReader();
                    dataTable.Load(sqlDataReader);
                    sqlDataReader.Close();
                    sqlConnection.Close();
                }
            }

            foreach (var subscriber in dataTable.AsEnumerable())
            {
                Subscriber newSubscriber = new()
                {
                    Email = Convert.ToString(subscriber["email"]),
                    HashId = Convert.ToString(subscriber["hash_id"])
                };
                subscribers.Enqueue(newSubscriber);
            }

            while (subscribers.Count != 0)
            {
                Subscriber subscriber = subscribers.Dequeue();

                Email email = new()
                {
                    From = _configuration.GetValue<string>("EmailServiceConfig:WebsiteEmail"),
                    To = subscriber.Email,
                    Subject = "A new blog post is here!",
                    Body = string.Format(@"<div style='padding: 10px;'>
                <img src='{2}' alt='{3}' style='width: 80%; max-width: 400px'/>
                <h1 style='margin: 0px;'>{0}</h1>
                <p style='margin: 0px; font-style: italic;'>By {1}</p>
                <p style='margin: 0px; padding: 8px 0px'>{4}</p>
                <a href='{5}'>Read more</a>
            </div>", post.Title, post.Author, post.ImageUrl, post.ImageAlt, post.Description, post.Link)
                };

                _emailService.SendEmailAsync(email);
            }

            return Ok();
        }
    }
}
