using System.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using portfolioAPI.Models;
using portfolioAPI.Services.EmailService;
using portfolioAPI.Services.HashService;
using portfolioAPI.Services.LogService;

namespace portfolioAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnverifiedEmailsController : ControllerBase
    {
        private IConfiguration _configuration;
        private IHashService _hashService;
        private IEmailService _emailService;
        private readonly ILogService _logService;
        private readonly string environment;

        public UnverifiedEmailsController(IConfiguration configuration, IHashService hashService, IEmailService emailService, ILogService logService)
        {
            _configuration = configuration;
            _hashService = hashService;
            _emailService = emailService;
            _logService = logService;
            environment = _configuration.GetValue<string>("Environment");
        }

        [HttpPost]
        [Route("Add")]
        public IActionResult Add(Subscriber subscriber)
        {
            try
            {
                // ***************************************************************************
                // * Add Unverified Email Step 1: Intialize data variables                   *
                // ***************************************************************************

                _logService.LogInfo("Add Unverified Email Step 1: Intialize data variables");
                string query = "insert into dbo.unverified_emails values(@email, @hashId)";

                // ***************************************************************************
                // * Add Unverified Email Step 1a: Intialize data source                     *
                // ***************************************************************************

                _logService.LogInfo("Add Unverified Email Step 1a: Intialize data source");
                string sqlDatasource;
                if (environment == "DEV")
                {
                    sqlDatasource = _configuration.GetValue<string>("ConnectionStringsDev:db");
                }
                else
                {
                    sqlDatasource = _configuration.GetValue<string>("ConnectionStrings:db");
                }
                _logService.LogInfo("Add Unverified Email Step 1a: Data source intialized");

                // ***************************************************************************
                // * Add Unverified Email Step 1b: Create hashId                             *
                // ***************************************************************************

                _logService.LogInfo("Add Unverified Email Step 1b: Create hash id");

                string hashId = _hashService.getHashSha256(subscriber.Email);

                _logService.LogInfo("Add Unverified Email Step 1b: Hash id created");

                // ***************************************************************************
                // * Add Unverified Email Step 2: Validate data source                       *
                // ***************************************************************************

                _logService.LogInfo("Add Unverified Email Step 2: Validate data source");
                if (sqlDatasource == "")
                {
                    throw new Exception("Add Unverified Email Step 2: ERROR! Data source is blank");
                }
                _logService.LogInfo("Add Unverified Email Step 2: Success! Data source is valid");

                // ***************************************************************************
                // * Add Unverified Email Step 3: Add subscriber to database                 *
                // ***************************************************************************

                _logService.LogInfo("Add Unverified Email Step 3: Add unverified email to database");

                DataTable dataTable = new DataTable();
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


                _logService.LogInfo("Add Unverified Email Step 3: Success! Unverified email added");

                // ********************************************************************
                // * Add Unverified Email Step 4: Send verification email            *
                // ********************************************************************

                _logService.LogInfo("Add Unverified Email Step 4: Send verification email");

                // ********************************************************************
                // * Add Unverified Email Step 4a: Create email object                *
                // ********************************************************************

                _logService.LogInfo("Add Unverified Email Step 4a: Create email object");
                Email email = new()
                {
                    From = _configuration.GetValue<string>("EmailServiceConfig:WebsiteEmail"),
                    To = subscriber.Email,
                    Subject = "Please Verify Your Email",
                    Body = string.Format(@"<p>You have subscribed to http://ianbentley.me/blog. If you did not make this subscription please disregard this email. Otherwise, use the link below to subscribe.</p>
<a href='http://localhost:5173/blog/subscribe/validation/{0}/{1}'>http://localhost:5173/blog/subscribe/validation/{0}/{1}</a>", subscriber.Email, hashId)
                };

                // **********************************************************
                // * Add Unverified Email Step 4b: Validations             *
                // **********************************************************

                _logService.LogInfo("Add Unverified Email Step 2: Validations");

                // ********************************************************************
                // * Add Unverified Email Step 4b.a: Validate destination email       *
                // ********************************************************************

                _logService.LogInfo("Add Unverified Email Step 4b.a: Validate destination email");
                if (email.To == "")
                {
                    throw new Exception("Add Unverified Email Step 4b.a: ERROR! Destination email is blank");
                }
                _logService.LogInfo("Add Unverified Email Step 4b.a: Success! Destination email is valid");

                // ******************************************************************
                // * Add Unverified Email Step 4b.b: Validate sending email         *
                // ******************************************************************

                _logService.LogInfo("Add Unverified Email Step 4b.b: Validate sending email");
                if (email.From == "")
                {
                    throw new Exception("Add Unverified Email Step 4b.b: ERROR! Sending email is blank");
                }
                _logService.LogInfo("Add Unverified Email Step 4b.b: Success! Sending email is valid");

                // ******************************************************************
                // * Add Unverified Email Step 4b.c: Validate subject               *
                // ******************************************************************

                _logService.LogInfo("Add Unverified Email Step 4b.c: Validate subject");
                if (email.Subject == "")
                {
                    throw new Exception("Add Unverified Email Step 4b.c: ERROR! Subject is blank");
                }
                _logService.LogInfo("Add Unverified Email Step 4b.c: Success! Subject is valid");

                // ******************************************************************
                // * Add Unverified Email Step 4b.d: Validate body                  *
                // ******************************************************************

                _logService.LogInfo("Add Unverified Email Step 4b.d: Validate body");
                if (email.Body == "")
                {
                    throw new Exception("Add Unverified Email Step 4b.d: ERROR! Body is blank");
                }
                _logService.LogInfo("Add Unverified Email Step 4b.d: Success! Body is valid");

                _logService.LogInfo("Add Unverified Email Step 4b: Success! All validations completed.");

                // **********************************************************
                // * Add Unverified Email Step 5: Send email                *
                // **********************************************************

                _logService.LogInfo("Add Unverified Email Step 5: Send email");
                _emailService.SendEmailAsync(email);
                _logService.LogInfo("Add Unverified Email Step 5: Success! Email sent");

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
