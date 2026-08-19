using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Application.Modules.Courses.Queries.GetAllCoursesByProgram
{
    public sealed class GetAllCoursesByProgramResponse
    {
        public List<CourseItem> Courses { get; set; } = new List<CourseItem>();
    }
    
    public sealed class CourseItem
    {
        public int Id { get; init; }

        public string Title { get; init; } = string.Empty;

        public string Description { get; init; } = string.Empty;

        public decimal FinalPrice { get; init; }

        public string? ThumbnailUrl { get; init; }

        public int DurationInWeeks { get; init; }

        public int SessionsCount { get; init; }

        public bool RequiresLaptop { get; init; }

        public int MinimumAge { get; init; }

        public int MaximumAge { get; init; }
    }
}
