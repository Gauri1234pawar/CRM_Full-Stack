using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using CRM.Models;

namespace CRM.Data
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseSqlServer("Server=DESKTOP-DTI0TKP;Database=CRM_DB;Trusted_Connection=True;Encrypt=False;");


            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
