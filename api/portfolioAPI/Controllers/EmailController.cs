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
        public IActionResult ContactMe([FromBody] Email email)
        {
            email.To = _configuration.GetValue<string>("EmailServiceConfig:WebsiteEmail");
            _emailService.SendEmailAsync(email);
            JsonResult jsonResult = new JsonResult("Contact Email Sent");
            return Ok(jsonResult);
        }
    }
}
