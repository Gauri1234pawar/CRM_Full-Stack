using System.ComponentModel.DataAnnotations;

namespace YourNamespace.Models
{
    public class Enquiry
    {
        [Key]
        public int Id { get; set; }  // Required primary key

        public string Name { get; set; }
        public string Location { get; set; }

        // Lists are not supported, use comma-separated string
        public string Requirements { get; set; }
        public string Budget { get; set; }

        public string PreferredLocation { get; set; }
        public string Builder { get; set; }
        public string Project { get; set; }
    }
}
