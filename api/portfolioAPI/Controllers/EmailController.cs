using System.Data;
using System.Diagnostics;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using portfolioAPI.Models;
using portfolioAPI.Services.EmailService;
using portfolioAPI.Services.LogService;

namespace portfolioAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        private readonly ILogService _logService;
        private readonly string environment;

        public EmailController(IEmailService emailService, IConfiguration configuration, ILogService logService)
        {
            _emailService = emailService;
            _configuration = configuration;
            _logService = logService;
            environment = _configuration.GetValue<string>("Environment");
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

                _logService.LogInfo("Sending Contact Email Step 1: Create email object");
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
                _logService.LogInfo("Sending Contact Email Step 1: Success! Email object created.");

                // **********************************************************
                // * Sending Contact Email Step 2: Validations              *
                // **********************************************************

                _logService.LogInfo("Sending Contact Email Step 2: Validations");

                // ******************************************************************
                // * Sending Contact Email Step 2a: Validate destination email      *
                // ******************************************************************

                _logService.LogInfo("Sending Contact Email Step 2a: Validate destination email");
                if (email.To == "")
                {
                    throw new Exception("Sending Contact Email Step 2a: ERROR! Destination email is blank");
                }
                _logService.LogInfo("Sending Contact Email Step 2a: Success! Destination email is valid");

                // ******************************************************************
                // * Sending Contact Email Step 2b: Validate sending email          *
                // ******************************************************************

                _logService.LogInfo("Sending Contact Email Step 2b: Validate sending email");
                if (email.From == "")
                {
                    throw new Exception("Sending Contact Email Step 2b: ERROR! Sending email is blank");
                }
                _logService.LogInfo("Sending Contact Email Step 2b: Success! Sending email is valid");

                // ******************************************************************
                // * Sending Contact Email Step 2c: Validate subject                *
                // ******************************************************************

                _logService.LogInfo("Sending Contact Email Step 2c: Validate subject");
                if (email.Subject == "")
                {
                    throw new Exception("Sending Contact Email Step 2c: ERROR! Subject is blank");
                }
                _logService.LogInfo("Sending Contact Email Step 2c: Success! Subject is valid");

                // ******************************************************************
                // * Sending Contact Email Step 2d: Validate body                   *
                // ******************************************************************

                _logService.LogInfo("Sending Contact Email Step 2d: Validate body");
                if (email.Body == "")
                {
                    throw new Exception("Sending Contact Email Step 2d: ERROR! Body is blank");
                }
                _logService.LogInfo("Sending Contact Email Step 2d: Success! Body is valid");

                _logService.LogInfo("Sending Contact Email Step 2: Success! All validations completed.");

                // **********************************************************
                // * Sending Contact Email Step 3: Send email               *
                // **********************************************************

                _logService.LogInfo("Sending Contact Email Step 3: Send email");
                _emailService.SendEmailAsync(email);
                _logService.LogInfo("Sending Contact Email Step 3: Success! Email sent");
                return Ok();
            }
            catch (Exception e)
            {
                _logService.LogError(e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPost]
        [Route("NotifySubscribers")]
        public IActionResult NotifySubscribers([FromBody] Post post)
        {
            try
            {
                Queue<Subscriber> subscribers = new Queue <Subscriber>();

                // ***************************************************************************
                // * Notify Subscribers Step 1: Get subscriber data                          *
                // ***************************************************************************

                _logService.LogInfo("Notify Subscribers Step 1: Get subscriber data");

                // ***************************************************************************
                // * Notify Subscribers Step 1a: Intialize data variables                    *
                // ***************************************************************************

                _logService.LogInfo("Notify Subscribers Step 1a: Intialize data variables");
                string sqlDatasource;
                if (environment == "DEV")
                {
                    sqlDatasource = _configuration.GetValue<string>("ConnectionStringsDev:db");
                } 
                else
                {
                    sqlDatasource = _configuration.GetValue<string>("ConnectionStrings:db");
                }
                string query = "select * from subscribers";
                _logService.LogInfo("Notify Subscribers Step 1a: Data variables initialized");

                // ***************************************************************************
                // * Notify Subscribers Step 1b: Validate data source                        *
                // ***************************************************************************

                _logService.LogInfo("Notify Subscribers Step 1b: Validate data source");
                if (sqlDatasource == "")
                {
                    throw new Exception("Notify Subscribers Step 1b: ERROR! Data source is blank");
                }
                _logService.LogInfo("Notify Subscribers Step 1b: Success! Data source is valid");

                // ***************************************************************************
                // * Notify Subscribers Step 1c: Query database                              *
                // ***************************************************************************

                _logService.LogInfo("Notify Subscribers Step 1c: Query database");
                DataTable dataTable = new DataTable();
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
                _logService.LogInfo("Notify Subscribers Step 1c: Success! Data table is set");

                // ***************************************************************************
                // * Notify Subscribers Step 1d: Fill subscriber queue with data table       *
                // ***************************************************************************

                _logService.LogInfo("Notify Subscribers Step 1d: Fill subscriber queue with data table");

                foreach (var subscriber in dataTable.AsEnumerable())
                {
                    Subscriber newSubscriber = new()
                    {
                        Email = Convert.ToString(subscriber["email"]),
                        HashId = Convert.ToString(subscriber["hash_id"])
                    };
                    subscribers.Enqueue(newSubscriber);
                }

                if (subscribers.Count == 0)
                {
                    _logService.LogWarn("Notify Subcribers Step 1d: WARN. Subscriber queue is empty. Please verify if this is expected. No emails will be sent.");
                }
                else
                {
                    _logService.LogInfo("Notify Subscribers Step 1d: Success! Subscriber queue filled");
                }

                // ***************************************************************************
                // * Notify Subscribers Step 2: Send subcriber emails                        *
                // ***************************************************************************

                _logService.LogInfo("Notify Subscribers Step 2: Send subcriber emails ");
                
                int emailsSent = 0;
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

                    if (environment != "PROD")
                    {
                        email.To = _configuration.GetValue<string>("EmailServiceConfigDev:WebsiteEmail");
                    }
                    _emailService.SendEmailAsync(email);
                    emailsSent++;
                }
                _logService.LogInfo($"Notify Subscribers Step 2: {emailsSent} subcriber emails sent");

                return Ok();
            }
            catch (Exception e)
            {
                _logService.LogError(e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
