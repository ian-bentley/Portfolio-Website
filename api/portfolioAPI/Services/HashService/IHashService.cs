using System.Text;

namespace portfolioAPI.Services.HashService
{
    public interface IHashService
    {
        public string getHashSha256(string text);
    }
}
