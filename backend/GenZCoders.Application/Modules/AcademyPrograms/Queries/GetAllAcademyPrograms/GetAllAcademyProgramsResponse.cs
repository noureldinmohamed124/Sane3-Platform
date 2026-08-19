using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Application.Modules.AcademyPrograms.Queries.GetAllAcademyPrograms
{
    public sealed class GetAllAcademyProgramsResponse
    {
        public List<AcademyProgramItem> AcademyPrograms { get; set; } = new List<AcademyProgramItem>();
    }

    public sealed class AcademyProgramItem
    {
        public int Id { get; init; }
        public string Name { get; init; } = string.Empty;
        public string Description { get; init; } = string.Empty;
        public string ThumbnailUrl { get; init; } = string.Empty;
        public int AgeFrom { get; set; }
        public int AgeTo { get; set; }
        public int CoursesCount { get; init; }
    }
}
