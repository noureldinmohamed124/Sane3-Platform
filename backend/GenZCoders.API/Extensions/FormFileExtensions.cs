using GenZCoders.Application.Modules.EnrollmentApplications.Commands.CreateEnrollmentApplication;

namespace GenZCoders.API.Extensions
{
    public static class FormFileExtensions
    {
        public static UploadedFile ToUploadedFile(this IFormFile file)
        {
            return new UploadedFile
            {
                Content = file.OpenReadStream(),
                FileName = file.FileName,
                ContentType = file.ContentType,
                Length = file.Length
            };
        }
    }
}
