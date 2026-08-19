using GenZCoders.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Domain.Entities
{
    public class ConsultationRequest
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Phone { get; set; } = null!;

        public string Email { get; set; } = null!;

        public int? Age { get; set; }

        public string EducationLevel { get; set; } = null!;


        public DateOnly PreferredMeetingDate { get; set; }

        public TimeOnly PreferredMeetingTime { get; set; }

        public string? Notes { get; set; }

        public ConsultationStatus Status { get; set; }


        public int? InterestedProgramId { get; set; }
        public AcademyProgram? InterestedProgram { get; set; }

        public int? AssignedInstructorId { get; set; }
        public Instructor? AssignedInstructor { get; set; }

        public string? MeetingLink { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
