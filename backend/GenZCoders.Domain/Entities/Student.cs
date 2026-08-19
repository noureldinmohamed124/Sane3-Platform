using GenZCoders.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Domain.Entities
{
    public class Student
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public DateOnly DoB { get; set; }

        public string City { get; set; } = string.Empty;

        public EducationLevel EducationLevel { get; set; }

        public string InstitutionName { get; set; } = string.Empty;
        public string CurrentLevel { get; set; } = string.Empty;
        public string Faculty { get; set; } = string.Empty;

        public GraduationStatus GraduationStatus { get; set; }

        public decimal CreatorMindsetScore { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }


        public User User { get; set; } = null!;
    }
}
