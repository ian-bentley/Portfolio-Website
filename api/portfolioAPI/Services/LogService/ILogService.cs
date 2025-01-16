namespace portfolioAPI.Services.LogService
{
    public interface ILogService
    {
        void LogInfo(string message);
        void LogWarn(string message);
        void LogError(string message);
    }
}
