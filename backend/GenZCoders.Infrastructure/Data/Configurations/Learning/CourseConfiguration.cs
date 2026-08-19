using GenZCoders.Domain;
using GenZCoders.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Infrastructure.Data.Configurations.Learning
{
    internal class CourseConfiguration : IEntityTypeConfiguration<Course>
    {
        public void Configure(EntityTypeBuilder<Course> builder)
        {
            builder.ToTable("Courses");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Title)
                .IsRequired()
                .HasMaxLength(DatabaseConstraints.TitleMaxLength)
                .IsUnicode();

            builder.Property(x => x.Description)
                .IsRequired()
                .HasMaxLength(DatabaseConstraints.DescriptionMaxLength)
                .IsUnicode();

            builder.Property(x => x.Price)
                .HasPrecision(10, 2);

            builder.Property(x => x.DiscountPercentage)
                .IsRequired(false)
                .HasPrecision(5, 2);

            builder.Property(x => x.FinalPrice)
                .HasPrecision(10, 2);

            builder.Property(x => x.DurationWeeks)
                .IsRequired();

            builder.Property(x => x.CoreSessionsCount)
                .IsRequired();

            builder.Property(x => x.TechnicalSupportCount)
                .IsRequired();

            builder.Property(x => x.RequiresLaptop)
                .HasDefaultValue(true);

            builder.Property(x => x.MinimumAge)
                .IsRequired();

            builder.Property(x => x.MaximumAge)
                .IsRequired();

            builder.Property(x => x.Image)
                .HasMaxLength(DatabaseConstraints.UrlMaxLength)
                .IsUnicode(false);

            builder.Property(x => x.Status)
                .HasConversion<int>();

            builder.HasIndex(x => x.Title);

            builder.HasOne(x => x.Program)
                .WithMany(x => x.Courses)
                .HasForeignKey(x => x.ProgramId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
    
}
