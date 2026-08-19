using GenZCoders.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Domain.Entities
{
    public class EnrollmentApplication
    {
        public int Id { get; set; }

        public int CourseId { get; set; }

        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;

        public DateOnly DateOfBirth { get; set; }

        public string City { get; set; } = string.Empty;

        public EducationLevel EducationLevel { get; set; }

        public string InstitutionName { get; set; } = string.Empty;

        public string CurrentLevel { get; set; } = string.Empty;

        public string? Faculty { get; set; } = string.Empty;

        public GraduationStatus GraduationStatus { get; set; }

        public string StudentPhone { get; set; } = string.Empty;

        public string StudentEmail { get; set; } = string.Empty;

        public string ParentName { get; set; } = string.Empty;

        public string ParentPhone { get; set; } = string.Empty;

        public string ParentEmail { get; set; } = string.Empty;

        public EnrollmentStatus Status { get; set; }

        public DateTime RequestedAt { get; set; }

        public DateTime? ReviewedAt { get; set; }

        public int? ReviewedByUserId { get; set; }
        public User? ReviewedByUser { get; set; }

        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }


        public Course Course { get; set; } = null!;
        public EnrollmentAssessment? Assessment { get; set; }
        public Payment? Payment { get; set; }
    }
}
