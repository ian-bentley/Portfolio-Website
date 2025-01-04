using System.Security.Cryptography;
using System.Text;

namespace portfolioAPI.Services.HashService
{
    public class HashService : IHashService
    {
        public string getHashSha256(string text)
        {
            var hash = new StringBuilder();
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(text));

                foreach (byte theByte in hashBytes)
                {
                    hash.Append(theByte.ToString("x2"));
                }

            }
            return hash.ToString();
        }
    }
}
