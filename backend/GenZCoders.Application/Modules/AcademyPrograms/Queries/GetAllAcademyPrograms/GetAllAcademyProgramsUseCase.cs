using GenZCoders.Application.Abstractions.Presistance;
using GenZCoders.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Application.Modules.AcademyPrograms.Queries.GetAllAcademyPrograms
{
    public class GetAllAcademyProgramsUseCase
    {
        private readonly IAcademyProgramRepo _academyProgramRepo;

        public GetAllAcademyProgramsUseCase(IAcademyProgramRepo academyProgramRepo)
        {
            _academyProgramRepo = academyProgramRepo;
        }

        public async Task<GetAllAcademyProgramsResponse> ExecuteAsync(GetAllAcademyProgramsQuery query)
        {
            var programs = await _academyProgramRepo.GetAllAcademyProgramsAsync();

            var academyPrograms = programs.Select(program => new AcademyProgramItem
            {
                Id = program.Id,
                Name = program.Name,
                Description = program.Description,
                AgeFrom = program.AgeFrom,
                AgeTo = program.AgeTo,
                ThumbnailUrl = program.ThumbnailUrl,
                CoursesCount = program.Courses.Count(course => course.Status == CourseStatus.Published)
            }).ToList();

            return new GetAllAcademyProgramsResponse
            {
                AcademyPrograms = academyPrograms,
            };
        }
    }
}
