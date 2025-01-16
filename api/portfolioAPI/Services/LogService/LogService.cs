using System.Diagnostics;

namespace portfolioAPI.Services.LogService
{
    public class LogService : ILogService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<LogService> _logger;

        public LogService(IConfiguration configuration, ILogger<LogService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }
        public void LogInfo(string message)
        {
            string environment = _configuration.GetValue<string>("Environment");
            if (environment == "DEV" || environment == "QA")
            {
                _logger.LogInformation($"Debug: {DateTime.Now} {message}");
            }
        }

        public void LogWarn(string message)
        {
            string environment = _configuration.GetValue<string>("Environment");
            if (environment == "DEV" || environment == "QA")
            {
                _logger.LogWarning(message);
            }
        }

        public void LogError(string message)
        {
            string environment = _configuration.GetValue<string>("Environment");
            if (environment == "DEV" || environment == "QA")
            {
                _logger.LogError(message);
            }
        }
    }
}
