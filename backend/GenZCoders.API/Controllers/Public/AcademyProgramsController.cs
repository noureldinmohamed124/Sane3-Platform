using GenZCoders.API.Common;
using GenZCoders.Application.Modules.AcademyPrograms.Queries.GetAllAcademyPrograms;
using GenZCoders.Application.Modules.Courses.Queries.GetAllCoursesByProgram;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GenZCoders.API.Controllers.Public
{
    [Route("api/[controller]")]
    [ApiController]
    public class AcademyProgramsController : BaseApiController
    {
        private readonly GetAllAcademyProgramsUseCase _getAllAcademyProgramsUseCase;
        private readonly GetAllCoursesByProgramUseCase _getAllCoursesByProgramUseCase;

        public AcademyProgramsController(GetAllAcademyProgramsUseCase getAllAcademyProgramsUseCase, GetAllCoursesByProgramUseCase getAllCoursesByProgramUseCase)
        {
            _getAllAcademyProgramsUseCase = getAllAcademyProgramsUseCase;
            _getAllCoursesByProgramUseCase = getAllCoursesByProgramUseCase;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllAcademyPrograms()
        {
            var response = await _getAllAcademyProgramsUseCase.ExecuteAsync(new GetAllAcademyProgramsQuery());

            return OkResponse(response);
        }


        [HttpGet("{programId}/courses")]
        public async Task<IActionResult> GetAllCoursesByProgram(int programId)
        {
            var response = await _getAllCoursesByProgramUseCase.ExecuteAsync(new GetAllCoursesByProgramQuery { ProgramId = programId });

            return OkResponse(response);
        }
    }
}
