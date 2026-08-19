using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Application.Abstractions.FileStorage
{
    public class UploadedFileResult
    {
        public string Url { get; init; } = string.Empty;

        public string PublicId { get; init; } = string.Empty;
    }
}
