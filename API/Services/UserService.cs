using System;
using System.Linq;
using System.Security.Cryptography;
using API.Data;
using API.Models;
using API.Models.DTO;


namespace API.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }


//help function for user exist
        public bool DoesUserExist(string username)
        {
           return _context.UserInfo.SingleOrDefault(user => user.Username == username) != null;
           
        }


//ADDING USER LOGIC
        public bool AddUser(CreateAccountDTO userToAdd)
        {
            bool result = false;
            if(!DoesUserExist(userToAdd.Username))
            {
                UserModels User = new UserModels();
            }
            return result;
        }


        public PasswordDTO HashPassword(string password)
        {
            PasswordDTO newHashedPassword = new PasswordDTO();

            byte[] SaltBytes = new byte[64];
            var provider = new RNGCryptoServiceProvider();
            provider.GetNonZeroBytes(SaltBytes);
            var Salt = Convert.ToBase64String(SaltBytes);
            var Rfc2898DeriveBytes = new Rfc2898DeriveBytes(password, SaltBytes, 10000);
            var Hash = Convert.ToBase64String(Rfc2898DeriveBytes.GetBytes(256));
            
           newHashedPassword.Salt = Salt;
           newHashedPassword.Hash = Hash;

           return newHashedPassword;
            
        }







    }

}
