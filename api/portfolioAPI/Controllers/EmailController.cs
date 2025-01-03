using Microsoft.AspNetCore.Mvc;
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
            
            _emailService.SendEmailAsync(email);
            JsonResult jsonResult = new JsonResult(email);
            //JsonResult jsonResult = new JsonResult("Contact Email Sent");
            return Ok(jsonResult);
        }
    }
}
