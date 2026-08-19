using GenZCoders.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Application.Abstractions.Presistance
{
    public interface ICourseRepo : IGenericRepo<Course>
    {
        Task<Course?> GetCourseByIdWithProgramAsync(int id);
        Task<IEnumerable<Course>> GetAllPublishedCoursesByProgramIdAsync(int programId);
    }
}
