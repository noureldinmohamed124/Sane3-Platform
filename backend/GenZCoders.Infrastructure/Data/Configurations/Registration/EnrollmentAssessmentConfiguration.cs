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
    internal class EnrollmentAssessmentConfiguration : IEntityTypeConfiguration<EnrollmentAssessment>
    {
        public void Configure(EntityTypeBuilder<EnrollmentAssessment> builder)
        {
            builder.ToTable("EnrollmentAssessments");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.HasProgrammingExperience)
                .HasDefaultValue(false);

            builder.Property(x => x.ProgrammingExperienceLevel)
                .HasMaxLength(DatabaseConstraints.NameMaxLength)
                .IsUnicode();

            builder.Property(x => x.ProgrammingTools)
                .HasMaxLength(DatabaseConstraints.DescriptionMaxLength)
                .IsUnicode();

            builder.Property(x => x.PrimaryGoal)
                .IsRequired()
                .HasMaxLength(DatabaseConstraints.DescriptionMaxLength)
                .IsUnicode();


            builder.HasIndex(x => x.EnrollmentApplicationId)
                .IsUnique();

            builder.HasOne(x => x.EnrollmentApplication)
                .WithOne(x => x.Assessment)
                .HasForeignKey<EnrollmentAssessment>(x => x.EnrollmentApplicationId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
