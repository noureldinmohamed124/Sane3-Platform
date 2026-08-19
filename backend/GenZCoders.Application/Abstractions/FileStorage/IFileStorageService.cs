using GenZCoders.Application.Modules.EnrollmentApplications.Commands.CreateEnrollmentApplication;
using GenZCoders.Shared.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Application.Abstractions.FileStorage
{
    public interface IFileStorageService
    {
        Task<UploadedFileResult> UploadAsync(UploadedFile file);

        Task DeleteAsync(string publicId);
    }
}
