using Microsoft.AspNetCore.Mvc;
using CRM.Data;
using CRM.Models;

namespace CRM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ✅ LOGIN Endpoint Only
        [HttpPost("login")]
        public IActionResult Login([FromBody] User login)
        {
            var user = _context.Users.FirstOrDefault(u =>
                u.Username == login.Username && u.Password == login.Password);

            if (user == null)
            {
                return Unauthorized(new
                {
                    success = false,
                    message = "Invalid credentials"
                });
            }

            return Ok(new
            {
                success = true,
                message = "Login successful"
            });
        }
    }
}
