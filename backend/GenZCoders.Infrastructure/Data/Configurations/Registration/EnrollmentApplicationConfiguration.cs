using GenZCoders.Domain;
using GenZCoders.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Infrastructure.Data.Configurations.Registration
{
    internal class EnrollmentApplicationConfiguration : IEntityTypeConfiguration<EnrollmentApplication>
    {
        public void Configure(EntityTypeBuilder<EnrollmentApplication> builder)
        {
            builder.ToTable("EnrollmentApplications");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.FirstName)
                .IsRequired()
                .HasMaxLength(DatabaseConstraints.NameMaxLength)
                .IsUnicode();

            builder.Property(x => x.LastName)
                .IsRequired()
                .HasMaxLength(DatabaseConstraints.NameMaxLength)
                .IsUnicode();

            builder.Property(x => x.City)
                .IsRequired()
                .HasMaxLength(DatabaseConstraints.CityMaxLength)
                .IsUnicode();

            builder.Property(x => x.EducationLevel)
                .HasConversion<int>();

            builder.Property(x => x.InstitutionName)
                .IsRequired()
                .HasMaxLength(DatabaseConstraints.InstitutionNameMaxLength)
                .IsUnicode();

            builder.Property(x => x.CurrentLevel)
                .IsRequired()
                .HasMaxLength(DatabaseConstraints.CurrentLevelMaxLength)
                .IsUnicode();

            builder.Property(x => x.Faculty)
                .HasMaxLength(DatabaseConstraints.FacultyMaxLength)
                .IsRequired(false)
                .IsUnicode();

            builder.Property(x => x.GraduationStatus)
                .HasConversion<int>();

            builder.Property(x => x.StudentPhone)
                .IsRequired()
                .HasMaxLength(DatabaseConstraints.PhoneMaxLength)
                .IsUnicode(false);

            builder.Property(x => x.StudentEmail)
                .IsRequired()
                .HasMaxLength(DatabaseConstraints.EmailMaxLength)
                .IsUnicode(false);

            builder.Property(x => x.ParentName)
                .IsRequired()
                .HasMaxLength(DatabaseConstraints.NameMaxLength)
                .IsUnicode();

            builder.Property(x => x.ParentPhone)
                .IsRequired()
                .HasMaxLength(DatabaseConstraints.PhoneMaxLength)
                .IsUnicode(false);

            builder.Property(x => x.ParentEmail)
                .IsRequired()
                .HasMaxLength(DatabaseConstraints.EmailMaxLength)
                .IsUnicode(false);

            builder.Property(x => x.Status)
                .HasConversion<int>();

            builder.Property(x => x.Notes)
                .HasMaxLength(DatabaseConstraints.NotesMaxLength)
                .IsUnicode();


            builder.HasIndex(x => x.StudentEmail);

            builder.HasIndex(x => x.StudentPhone);

            builder.HasIndex(x => x.Status);

            builder.HasOne(x => x.Course)
                .WithMany()
                .HasForeignKey(x => x.CourseId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.ReviewedByUser)
                .WithOne()
                .HasForeignKey<EnrollmentApplication>(e => e.ReviewedByUserId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
