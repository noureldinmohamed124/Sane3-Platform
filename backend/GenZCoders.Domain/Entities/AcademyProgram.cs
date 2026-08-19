using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Domain.Entities
{
    public class AcademyProgram
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public int AgeFrom { get; set; }

        public int AgeTo { get; set; }

        public int DisplayOrder { get; set; }

        public bool IsPublished { get; set; }

        public string ThumbnailUrl { get; set; } = string.Empty;

        public ICollection<Course> Courses { get; set; } = new List<Course>();

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }
}
