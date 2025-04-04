using System.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using portfolioAPI.Models;
using portfolioAPI.Services.LogService;

namespace portfolioAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscribersController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly ILogService _logService;
        private readonly string environment;

        public SubscribersController(IConfiguration configuration, ILogService logService)
        {
            _configuration = configuration;
            _logService = logService;
            environment = _configuration.GetValue<string>("Environment");
        }

        [HttpPost]
        [Route("Add")]
        public IActionResult Add([FromBody] Subscriber subscriber)
        {
            try
            {
                // ***************************************************************************
                // * Add Subscriber Step 1: Intialize data variables                         *
                // ***************************************************************************

                _logService.LogInfo("Add Subscriber Step 1: Intialize data variables");
                string sqlDatasource;
                if (environment == "DEV")
                {
                    sqlDatasource = _configuration.GetValue<string>("ConnectionStringsDev:db");
                }
                else
                {
                    sqlDatasource = _configuration.GetValue<string>("ConnectionStrings:db");
                }
                string query = "insert into dbo.subscribers values(@email, @hashId)";
                _logService.LogInfo("Add Subscriber Step 1: Data variables initialized");

                // ***************************************************************************
                // * Add Subscriber Step 2: Validate data source                             *
                // ***************************************************************************

                _logService.LogInfo("Add Subscriber Step 2: Validate data source");
                if (sqlDatasource == "")
                {
                    throw new Exception("Add Subscriber Step 2: ERROR! Data source is blank");
                }
                _logService.LogInfo("Add Subscriber Step 2: Success! Data source is valid");

                // ***************************************************************************
                // * Add Subscriber Step 3: Add subscriber to database                       *
                // ***************************************************************************

                _logService.LogInfo("Add Subscriber Step 3: Add subscriber to database");

                DataTable dataTable = new DataTable();
                SqlDataReader sqlDataReader;
                using (SqlConnection sqlConnection = new SqlConnection(sqlDatasource))
                {
                    sqlConnection.Open();
                    using (SqlCommand sqlCommand = new SqlCommand(query, sqlConnection))
                    {
                        sqlCommand.Parameters.AddWithValue("@email", subscriber.Email);
                        sqlCommand.Parameters.AddWithValue("@hashId", subscriber.HashId);
                        sqlDataReader = sqlCommand.ExecuteReader();
                        dataTable.Load(sqlDataReader);
                        sqlDataReader.Close();
                        sqlConnection.Close();
                    }
                }

                _logService.LogInfo("Add Subscriber Step 3: Success! Subscriber added");

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
