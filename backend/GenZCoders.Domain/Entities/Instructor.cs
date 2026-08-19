using GenZCoders.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Domain.Entities
{
    public class Instructor
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string Bio { get; set; } = string.Empty;
        public string Specialization { get; set; } = string.Empty;
        public int YearsExperience { get; set; }

        public string? LinkedInUrl { get; set; }
        public string? CvUrl { get; set; }

        public UserStatus Status { get; set; }

        public User User { get; set; } = null!;
    }
}
