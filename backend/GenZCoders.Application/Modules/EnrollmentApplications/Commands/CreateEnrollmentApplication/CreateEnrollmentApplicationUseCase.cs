using GenZCoders.Application.Abstractions.FileStorage;
using GenZCoders.Application.Abstractions.Presistance;
using GenZCoders.Domain.Entities;
using GenZCoders.Domain.Enums;
using GenZCoders.Shared.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace GenZCoders.Application.Modules.EnrollmentApplications.Commands.CreateEnrollmentApplication
{
    public class CreateEnrollmentApplicationUseCase
    {
        private readonly ICourseRepo _courseRepo;
        private readonly IEnrollmentApplicationRepo _enrollmentApplicationRepo;
        private readonly IFileStorageService _fileStorageService;
        private readonly IUnitOfWork _unitOfWork;

        public CreateEnrollmentApplicationUseCase(ICourseRepo courseRepo, IEnrollmentApplicationRepo enrollmentApplicationRepo, IFileStorageService fileStorageService, IUnitOfWork unitOfWork)
        {
            _courseRepo = courseRepo;
            _enrollmentApplicationRepo = enrollmentApplicationRepo;
            _fileStorageService = fileStorageService;
            _unitOfWork = unitOfWork;
        }

        public async Task<CreateEnrollmentApplicationResponse> ExecuteAsync(CreateEnrollmentApplicationCommand command)
        {
            var course = await _courseRepo.GetCourseByIdWithProgramAsync(command.CourseId);

            // Business Validation

            if (course is null)
                throw new NotFoundException("Course not found.");

            if (course.Status != CourseStatus.Published)
                throw new BusinessRuleException("Course is not available.");

            if (course.RequiresLaptop == true && command.HasLaptopConfirmation == false)
                throw new BadRequestException("You must confirm that you have a laptop to enroll in this course.");


            // Enrollment Application

            var alreadyApplied = await _enrollmentApplicationRepo.ExistsAsync(command.Student.StudentEmail, command.CourseId);

            if (alreadyApplied)
                throw new ConflictException("An enrollment application for this course already exists using this email address.");


            // Upload screenshot

            var uploadedFile = await _fileStorageService.UploadAsync(command.PaymentScreenshot);

            
            // Create the Enrollment Application

            var timeUtcNow = DateTime.UtcNow;

            var enrollmentApplication = new EnrollmentApplication
            {
                CourseId = course.Id,
                FirstName = command.Student.FirstName,
                LastName = command.Student.LastName,
                DateOfBirth = command.Student.DateOfBirth,

                StudentPhone = command.Student.StudentPhone,
                StudentEmail = command.Student.StudentEmail,

                City = command.Student.City,
                EducationLevel = command.Student.EducationLevel,
                InstitutionName = command.Student.InstitutionName,
                CurrentLevel = command.Student.CurrentLevel,
                Faculty = command.Student.Faculty,
                GraduationStatus = command.Student.GraduationStatus,

                ParentName = command.Parent.Name,
                ParentEmail = command.Parent.Email,
                ParentPhone = command.Parent.Phone,

                Status = EnrollmentStatus.Pending,

                RequestedAt = timeUtcNow,
                CreatedAt = timeUtcNow,
            };

            var assessment = new EnrollmentAssessment
            {
                HasProgrammingExperience = command.Assessment.HasProgrammingExperience,
                ProgrammingExperienceLevel = command.Assessment.ProgrammingExperienceLevel,
                ParticipatedInCompetitions = command.Assessment.ParticipatedInCompetitions,
                ProgrammingTools = command.Assessment.ProgrammingTools,
                PrimaryGoal = command.Assessment.PrimaryGoal,
                CreatedAt = timeUtcNow
            };

            var payment = new Payment
            {
                Amount = course.FinalPrice,
                ScreenshotUrl = uploadedFile.Url,
                ScreenshotPublicId = uploadedFile.PublicId,
                Status = PaymentStatus.Pending,
                UploadedAt = timeUtcNow,
            };

            enrollmentApplication.Assessment = assessment;
            enrollmentApplication.Payment = payment;

            try
            {
                await _enrollmentApplicationRepo.AddAsync(enrollmentApplication);
                await _unitOfWork.SaveChangesAsync();
            }
            catch
            {
                await _fileStorageService.DeleteAsync(uploadedFile.PublicId);
                throw;
            }

            return new CreateEnrollmentApplicationResponse
            {
                EnrollmentApplicationId = enrollmentApplication.Id,
                Message = "Your enrollment application has been submitted successfully."
            };

        }


    }
}
