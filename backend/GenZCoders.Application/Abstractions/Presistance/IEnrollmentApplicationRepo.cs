using GenZCoders.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Application.Abstractions.Presistance
{
    public interface IEnrollmentApplicationRepo : IGenericRepo<EnrollmentApplication>
    {
        Task<bool> ExistsAsync(string studentEmail, int courseId);
    }
}
