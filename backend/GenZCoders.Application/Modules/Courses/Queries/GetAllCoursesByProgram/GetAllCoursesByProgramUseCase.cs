using GenZCoders.Application.Abstractions.Presistance;
using GenZCoders.Shared.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Application.Modules.Courses.Queries.GetAllCoursesByProgram
{
    public class GetAllCoursesByProgramUseCase
    {
        private readonly ICourseRepo _courseRepo;
        private readonly IAcademyProgramRepo _programRepo;

        public GetAllCoursesByProgramUseCase(ICourseRepo courseRepo, IAcademyProgramRepo programRepo)
        {
            _courseRepo = courseRepo;
            _programRepo = programRepo;
        }


        public async Task<GetAllCoursesByProgramResponse> ExecuteAsync(GetAllCoursesByProgramQuery query)
        {
            var program = await _programRepo.GetAcademyProgramByIdAsync(query.ProgramId);

            if (program == null)
                throw new NotFoundException("This Program not found Or doesn't exist");

            var allCourses = await _courseRepo.GetAllPublishedCoursesByProgramIdAsync(query.ProgramId);

            //if (!allCourses.Any())
            //    throw new NotFoundException("There aren't any courses inside this Program");


            var courses = allCourses.Select(c => new CourseItem
            {
                Id = c.Id,
                Title = c.Title,
                Description = c.Description,
                FinalPrice = c.FinalPrice,
                DurationInWeeks = c.DurationWeeks,
                MaximumAge = c.MaximumAge,
                MinimumAge = c.MinimumAge,
                RequiresLaptop = c.RequiresLaptop,
                SessionsCount =  c.CoreSessionsCount,
                ThumbnailUrl = c.Image
            }).ToList();

            return new GetAllCoursesByProgramResponse
            {
                Courses = courses,
            };
                
        }
    }
}
