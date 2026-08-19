using GenZCoders.Domain.Entities;
using GenZCoders.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Application.Modules.EnrollmentApplications.Commands.CreateEnrollmentApplication
{
    public sealed class CreateEnrollmentApplicationCommand
    {
        public int CourseId { get; init; }

        public bool HasLaptopConfirmation { get; init; }

        public StudentInformation Student { get; init; } = null!;

        public ParentInformation Parent { get; init; } = null!;

        public AssessmentInformation Assessment { get; init; } = null!;

        public UploadedFile PaymentScreenshot { get; init; } = null!;
    }

    public sealed class StudentInformation
    {
        public string FirstName { get; init; } = string.Empty;

        public string LastName { get; init; } = string.Empty;

        public DateOnly DateOfBirth { get; init; }

        public string City { get; init; } = string.Empty;

        public EducationLevel EducationLevel { get; init; }

        public string InstitutionName { get; init; } = string.Empty;

        public string CurrentLevel { get; init; } = string.Empty;

        public string? Faculty { get; init; }

        public GraduationStatus GraduationStatus { get; init; }

        public string StudentPhone { get; init; } = string.Empty;

        public string StudentEmail { get; init; } = string.Empty;
    }

    public sealed class ParentInformation
    {
        public string Name { get; init; } = string.Empty;

        public string Phone { get; init; } = string.Empty;

        public string Email { get; init; } = string.Empty;
    }

    public sealed class AssessmentInformation
    {
        public bool HasProgrammingExperience { get; init; }

        public string? ProgrammingExperienceLevel { get; init; }

        public bool ParticipatedInCompetitions { get; init; }

        public string? ProgrammingTools { get; init; }

        public string PrimaryGoal { get; init; } = string.Empty;
    }

    public sealed class UploadedFile
    {
        public Stream Content { get; init; } = null!;

        public string FileName { get; init; } = string.Empty;

        public string ContentType { get; init; } = string.Empty;

        public long Length { get; init; }
    }
}
