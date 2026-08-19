using GenZCoders.Domain.Enums;

namespace GenZCoders.API.Contracts.EnrollmentApplications
{
    public class CreateEnrollmentApplicationRequestDto
    {
        public int ProgramId { get; set; }
        public int CourseId { get; set; }
        public bool HasLaptopConfirmation { get; set; }

        public StudentInfoDto Student { get; set; } = null!;

        public ParentInfoDto Parent { get; set; } = null!;

        public AssessmentInfoDto Assessment { get; set; } = null!;

        public IFormFile PaymentScreenshot { get; set; } = null!;

    }

    public class StudentInfoDto
    {
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public DateOnly DateOfBirth { get; set; }

        public string City { get; set; } = string.Empty;

        public EducationLevel EducationLevel { get; set; }

        public string InstitutionName { get; set; } = string.Empty;

        public string CurrentLevel { get; set; } = string.Empty;

        public string? Faculty { get; set; }

        public GraduationStatus GraduationStatus { get; set; }

        public string StudentPhone { get; set; } = string.Empty;

        public string StudentEmail { get; set; } = string.Empty;
    }
    public class ParentInfoDto
    {
        public string Name { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;
    }
    public class AssessmentInfoDto
    {
        public bool HasProgrammingExperience { get; set; }

        public string? ProgrammingExperienceLevel { get; set; }

        public bool ParticipatedInCompetitions { get; set; }

        public string? ProgrammingTools { get; set; }

        public string PrimaryGoal { get; set; } = string.Empty;
    }

}
