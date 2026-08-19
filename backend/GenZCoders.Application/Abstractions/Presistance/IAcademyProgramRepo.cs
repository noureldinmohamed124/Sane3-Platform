using GenZCoders.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Application.Abstractions.Presistance
{
    public interface IAcademyProgramRepo : IGenericRepo<AcademyProgram>
    {
        Task<IEnumerable<AcademyProgram>> GetAllAcademyProgramsAsync();
        Task<AcademyProgram?> GetAcademyProgramByIdAsync(int id);
    }
}
