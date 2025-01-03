﻿using Microsoft.AspNetCore.Mvc;
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
            return Ok(jsonResult);
        }

        [HttpPost]
        [Route("NotifySubscribers")]
        public IActionResult NotifySubscribers([FromBody] Post post)
        {
            Queue<Subscriber> subscribers = new Queue <Subscriber>();
            Subscriber testSub1 = new()
            {
                Id = "1",
                Email = "ibentley981203@gmail.com"
            };
            Subscriber testSub2 = new()
            {
                Id = "2",
                Email = "zatrat_123@yahoo.com"
            };

            subscribers.Enqueue(testSub1);
            subscribers.Enqueue(testSub2);

            foreach (var subscriber in subscribers)
            {
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
