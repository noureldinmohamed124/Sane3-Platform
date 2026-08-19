using FluentValidation;
using FluentValidation.Validators;
using GenZCoders.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Application.Modules.EnrollmentApplications.Commands.CreateEnrollmentApplication
{
    public sealed class CreateEnrollmentApplicationValidator : AbstractValidator<CreateEnrollmentApplicationCommand>
    {
        public CreateEnrollmentApplicationValidator()
        {
            RuleFor(x => x.CourseId)
                .GreaterThan(0);

            RuleFor(x => x.Student)
                .SetValidator(new StudentInformationValidator());

            RuleFor(x => x.Parent)
                .SetValidator(new ParentInformationValidator());

            RuleFor(x => x.Assessment)
                .SetValidator(new AssessmentInformationValidator());

            RuleFor(x => x.PaymentScreenshot)
                .NotNull()
                .Must(file => file.Length > 0)
                .WithMessage("Payment screenshot is required.");
        }
    }

    internal class StudentInformationValidator : AbstractValidator<StudentInformation>
    {
        public StudentInformationValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty()
                .MaximumLength(50);

            RuleFor(x => x.LastName)
                .NotEmpty()
                .MaximumLength(50);

            RuleFor(x => x.City)
                .NotEmpty()
                .MaximumLength(100);

            RuleFor(x => x.StudentEmail)
                .NotEmpty()
                .EmailAddress();

            RuleFor(x => x.StudentPhone)
                .NotEmpty();


            // The original
            /*When(x => x.EducationLevel == EducationLevel.SchoolStudent, () =>
{
    RuleFor(x => x.CurrentLevel)
        .NotEmpty();
});*/
            When(x => x.EducationLevel != EducationLevel.University, () =>
            {
                RuleFor(x => x.CurrentLevel)
                    .NotEmpty();
            });


            When(x =>
    x.EducationLevel != EducationLevel.University ||
    x.EducationLevel == EducationLevel.Graduate,
() =>
{
    RuleFor(x => x.Faculty)
        .NotEmpty();
});
        }
    }

    internal sealed class ParentInformationValidator : AbstractValidator<ParentInformation>
    {
        public ParentInformationValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .MaximumLength(100);

            RuleFor(x => x.Phone)
                .NotEmpty();

            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress();
        }
    }

    internal sealed class AssessmentInformationValidator : AbstractValidator<AssessmentInformation>
    {
        public AssessmentInformationValidator()
        {
            RuleFor(x => x.PrimaryGoal)
                .NotEmpty()
                .MaximumLength(500);

            When(x => x.HasProgrammingExperience, () =>
            {
                RuleFor(x => x.ProgrammingExperienceLevel)
                    .NotEmpty();

                RuleFor(x => x.ProgrammingTools)
                    .NotEmpty();
            });
        }
    }
}
