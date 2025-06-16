using CRM.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using YourNamespace.Models;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnquiryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EnquiryController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ✅ GET: api/enquiry
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetEnquiries()
        {
            var enquiries = _context.Enquiries.ToList();
            return Ok(enquiries);
        }
        [HttpGet("search")]
        public IActionResult SearchEnquiries(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return Ok(_context.Enquiries.ToList());
            }

            query = query.ToLower();

            var result = _context.Enquiries
                .Where(e =>
                    e.Name.ToLower().Contains(query) ||
                    e.Location.ToLower().Contains(query) ||
                    e.PreferredLocation.ToLower().Contains(query) ||
                    e.Requirements.ToLower().Contains(query) ||
                    e.Budget.ToLower().Contains(query) ||
                    e.Builder.ToLower().Contains(query) ||
                    e.Project.ToLower().Contains(query)
                )
                .ToList();

            return Ok(result);
        }

        // ✅ POST: api/enquiry
        [HttpPost]
        public IActionResult SaveEnquiry([FromBody] Enquiry enquiry)
        {
            if (enquiry == null)
                return BadRequest("Enquiry data is null.");

            _context.Enquiries.Add(enquiry);
            _context.SaveChanges();

            return Ok(new
            {
                message = "Enquiry submitted and saved successfully!",
                submittedData = enquiry
            });
        }
    }
}
