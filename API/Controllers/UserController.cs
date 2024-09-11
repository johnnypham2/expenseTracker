using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Models.DTO;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _data;
        public UserController(UserService dataFromService) 
        {
            _data = dataFromService;
        }

    //ADD USER
    [HttpPost("AddUsers")]
    public bool AddUser(CreateAccountDTO UserToAdd)
    {
       return _data.AddUser(UserToAdd);
    }

    //GETALLUSERS ENDPOINT
    [HttpGet("GetAllUsers")]

    public IEnumerable<UserModels> GetAllUsers()
    {
        return _data.GetAllUsers();
    }

    //GetUserByUserName
    [HttpGet("GetUsersByUsername/{username}")]

    public UserIdDTO GetUserIdDTOByUserName(string username)
    {
        return _data.GetUserIdDTOByUserName(username);
    }

    

    //LOGIN
    [HttpPost("Login")]

    public IActionResult Login([FromBody] LoginDTO User)
    {
        return _data.Login(User);
    }


    //DELETE USER
    [HttpPost("DeleteUser/{userToDelete}")]

    public bool DeleteUser(string userToDelete)
    {
        return _data.DeleteUser(userToDelete);
    }


 //UPDATE USER
    [HttpPost("UpdateUser")]

    public bool UpdateUser(int id, string username)
    {
        return _data.UpdateUser(id,username);
    }


    }
}