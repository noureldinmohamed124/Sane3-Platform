using GenZCoders.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Domain.Entities
{
    public class Course
    {
        public int Id { get; set; }

        public int ProgramId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public decimal? DiscountPercentage { get; set; }

        public decimal FinalPrice { get; set; }

        public int DurationWeeks { get; set; }

        public int CoreSessionsCount { get; set; }

        public int TechnicalSupportCount { get; set; }

        public bool RequiresLaptop { get; set; }

        public int MinimumAge { get; set; }

        public int MaximumAge { get; set; }

        public string? Image { get; set; }

        public CourseStatus Status { get; set; }

        public AcademyProgram Program { get; set; } = null!;


        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }
}
