using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using GenZCoders.Application.Abstractions.FileStorage;
using GenZCoders.Application.Modules.EnrollmentApplications.Commands.CreateEnrollmentApplication;
using GenZCoders.Shared.Results;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Infrastructure.FileStorage
{
    public class CloudinaryFileStorageService : IFileStorageService
    {
        private readonly Cloudinary _cloudinary;

        public CloudinaryFileStorageService(IOptions<CloudinarySettings> options)
        {
            var settings = options.Value;
            var account = new Account(settings.CloudName, settings.ApiKey, settings.ApiSecret);
            _cloudinary = new Cloudinary(account);
        }
        
        public async Task<UploadedFileResult> UploadAsync(UploadedFile file)
        {
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, file.Content),
                Folder = "genzcoders/payments"
            };

            var result = await _cloudinary.UploadAsync(uploadParams);

            if (result.Error is not null)
                throw new Exception(result.Error.Message);

            return new UploadedFileResult
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };
        }

        public async Task DeleteAsync(string publicId)
        {
            if (string.IsNullOrWhiteSpace(publicId))
                throw new ArgumentException("Public ID cannot be null or empty.", nameof(publicId));

            var deleteParams = new DeletionParams(publicId);

            var result = await _cloudinary.DestroyAsync(deleteParams);

            if (result.Error is not null)
                throw new Exception(result.Error.Message);
        }

    }
}
