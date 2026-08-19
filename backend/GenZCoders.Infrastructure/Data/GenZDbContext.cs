using GenZCoders.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Infrastructure.Data
{
    public class GenZDbContext : DbContext
    {
        public GenZDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(GenZDbContext).Assembly);
        }


        public DbSet<AcademyProgram> AcademyPrograms { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<ConsultationRequest> ConsultationRequests { get; set; }
        public DbSet<EnrollmentApplication> EnrollmentApplications { get; set; }
        public DbSet<EnrollmentAssessment> EnrollmentAssessments { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Instructor> Instructors { get; set; }

    }
}
