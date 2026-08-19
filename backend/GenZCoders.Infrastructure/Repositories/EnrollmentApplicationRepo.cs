using GenZCoders.Application.Abstractions.Presistance;
using GenZCoders.Domain.Entities;
using GenZCoders.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Infrastructure.Repositories
{
    public class EnrollmentApplicationRepo : GenericRepo<EnrollmentApplication>, IEnrollmentApplicationRepo
    {
        public EnrollmentApplicationRepo(GenZDbContext context) : base(context)
        {
        }

        public async Task<bool> ExistsAsync(string studentEmail, int courseId)
        {
            return await _context.EnrollmentApplications
                .AnyAsync(e => e.StudentEmail == studentEmail && e.CourseId == courseId);
        }
    }
}
