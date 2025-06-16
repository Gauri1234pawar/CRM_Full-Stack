using Microsoft.EntityFrameworkCore;
using CRM.Models;
using YourNamespace.Models;

namespace CRM.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Enquiry> Enquiries { get; set; }

        public DbSet<RegisteredUser> RegisteredUsers { get; set; }




    }
}
