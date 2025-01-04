using Newtonsoft.Json.Serialization;
using portfolioAPI.Services.EmailService;
using portfolioAPI.Services.HashService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Email Service
builder.Services.AddScoped<IEmailService, EmailService>();
// hash Service
builder.Services.AddScoped<IHashService, HashService>();

//JSON Serializer
builder.Services.AddControllers().AddNewtonsoftJson(options =>
options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore).AddNewtonsoftJson(
    options=>options.SerializerSettings.ContractResolver = new DefaultContractResolver());

var app = builder.Build();

//Enable CORS
app.UseCors(c=>c.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
