using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Domain.Entities
{
    public class EnrollmentAssessment
    {
        public int Id { get; set; }

        public int EnrollmentApplicationId { get; set; }

        public bool HasProgrammingExperience { get; set; }

        public string? ProgrammingExperienceLevel { get; set; }

        public bool ParticipatedInCompetitions { get; set; }

        public string? ProgrammingTools { get; set; }

        public string PrimaryGoal { get; set; } = null!;

        public DateTime CreatedAt { get; set; }

        public EnrollmentApplication EnrollmentApplication { get; set; } = null!;
    }
}
