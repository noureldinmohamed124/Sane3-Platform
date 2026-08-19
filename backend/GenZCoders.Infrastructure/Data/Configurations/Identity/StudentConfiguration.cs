using GenZCoders.Domain;
using GenZCoders.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Infrastructure.Data.Configurations.Identity
{
    internal class StudentConfiguration : IEntityTypeConfiguration<Student>
    {
        public void Configure(EntityTypeBuilder<Student> builder)
        {
            builder.ToTable("Students");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.DoB)
                .IsRequired();

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
                .IsUnicode();

            builder.Property(x => x.GraduationStatus)
                .HasConversion<int>();

            builder.Property(x => x.CreatorMindsetScore)
                .HasPrecision(5, 2)
                .HasDefaultValue(0);


            builder.HasIndex(x => x.UserId)
                .IsUnique();

            builder.HasOne(x => x.User)
                .WithOne(x => x.Student)
                .HasForeignKey<Student>(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
