using System.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using portfolioAPI.Models;

namespace portfolioAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscribersController : ControllerBase
    {
        private IConfiguration _configuration;

        public SubscribersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("Add")]
        public IActionResult Add([FromBody] Subscriber subscriber)
        {
            // Add email to db
            string query = "insert into dbo.subscribers values(@email, @hashId)";
            DataTable dataTable = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("portfolioDB");
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

            return Ok();
        }
    }
}
