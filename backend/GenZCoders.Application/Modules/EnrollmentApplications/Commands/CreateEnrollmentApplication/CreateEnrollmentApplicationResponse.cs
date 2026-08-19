using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Application.Modules.EnrollmentApplications.Commands.CreateEnrollmentApplication
{
    public class CreateEnrollmentApplicationResponse
    {
        public int EnrollmentApplicationId { get; init; }

        public string Message { get; init; } = string.Empty;
    }
}
