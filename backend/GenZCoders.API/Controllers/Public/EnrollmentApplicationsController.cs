using GenZCoders.API.Common;
using GenZCoders.API.Contracts.EnrollmentApplications;
using GenZCoders.API.Extensions;
using GenZCoders.Application.Modules.EnrollmentApplications.Commands.CreateEnrollmentApplication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GenZCoders.API.Controllers.User
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrollmentApplicationsController : BaseApiController
    {
        private readonly CreateEnrollmentApplicationUseCase _createEnrollmentApplicationUseCase;

        public EnrollmentApplicationsController(CreateEnrollmentApplicationUseCase createEnrollmentApplicationUseCase)
        {
            _createEnrollmentApplicationUseCase = createEnrollmentApplicationUseCase;
        }


        [HttpPost]
        public async Task<IActionResult> CreateEnrollmentApplication([FromForm] CreateEnrollmentApplicationRequestDto dto)
        {
            var command = new CreateEnrollmentApplicationCommand
            {
                CourseId = dto.CourseId,
                HasLaptopConfirmation = dto.HasLaptopConfirmation,
                Student = new StudentInformation
                {
                    FirstName = dto.Student.FirstName,
                    LastName = dto.Student.LastName,
                    DateOfBirth = dto.Student.DateOfBirth,
                    City = dto.Student.City,
                    EducationLevel = dto.Student.EducationLevel,
                    InstitutionName = dto.Student.InstitutionName,
                    CurrentLevel = dto.Student.CurrentLevel,
                    Faculty = dto.Student.Faculty,
                    GraduationStatus = dto.Student.GraduationStatus,
                    StudentEmail = dto.Student.StudentEmail,
                    StudentPhone = dto.Student.StudentPhone,
                },
                Parent = new ParentInformation
                {
                    Name = dto.Parent.Name,
                    Email = dto.Parent.Email,
                    Phone = dto.Parent.Phone,
                },
                Assessment = new AssessmentInformation
                {
                    HasProgrammingExperience = dto.Assessment.HasProgrammingExperience,
                    ParticipatedInCompetitions = dto.Assessment.ParticipatedInCompetitions,
                    PrimaryGoal = dto.Assessment.PrimaryGoal,
                    ProgrammingExperienceLevel = dto.Assessment.ProgrammingExperienceLevel,
                    ProgrammingTools = dto.Assessment.ProgrammingTools
                },
                PaymentScreenshot = dto.PaymentScreenshot.ToUploadedFile()
            };

            var response = await _createEnrollmentApplicationUseCase.ExecuteAsync(command);

            return OkResponse(response);
        }
    }
}
