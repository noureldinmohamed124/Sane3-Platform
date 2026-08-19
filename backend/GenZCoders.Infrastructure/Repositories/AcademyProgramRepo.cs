using GenZCoders.Domain.Entities;
using GenZCoders.Application.Abstractions.Presistance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GenZCoders.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GenZCoders.Infrastructure.Repositories
{
    public class AcademyProgramRepo : GenericRepo<AcademyProgram>, IAcademyProgramRepo
    {
        public AcademyProgramRepo(GenZDbContext context) : base(context)
        {
        }

        public async Task<AcademyProgram?> GetAcademyProgramByIdAsync(int id)
        {
            return await _context.AcademyPrograms
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<IEnumerable<AcademyProgram>> GetAllAcademyProgramsAsync()
        {
            return await _context.AcademyPrograms.Include(x => x.Courses).ToListAsync();
        }
    }
}
