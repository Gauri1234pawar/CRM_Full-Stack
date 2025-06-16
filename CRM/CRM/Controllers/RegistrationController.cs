using CRM.Data;
using CRM.Models;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RegistrationController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisteredUser user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // ✅ Save registered user details
            _context.RegisteredUsers.Add(user);

            // ✅ Also store credentials in Users table for login
            var newUser = new User
            {
                Username = user.Username,
                Password = user.Password
            };

            _context.Users.Add(newUser);
            _context.SaveChanges();

            return Ok(new { message = "Registration successful. You can now log in." });
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.RegisteredUsers.ToList());
        }
    }
}
