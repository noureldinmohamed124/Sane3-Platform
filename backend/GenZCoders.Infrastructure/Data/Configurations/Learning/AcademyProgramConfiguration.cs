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
    public class AcademyProgramConfiguration : IEntityTypeConfiguration<AcademyProgram>
    {
        public void Configure(EntityTypeBuilder<AcademyProgram> builder)
        {
            builder.ToTable("AcademyPrograms");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(DatabaseConstraints.TitleMaxLength)
                .IsUnicode();

            builder.Property(x => x.Description)
                .IsRequired()
                .HasMaxLength(DatabaseConstraints.DescriptionMaxLength)
                .IsUnicode();

            builder.Property(x => x.AgeFrom)
                .IsRequired();

            builder.Property(x => x.AgeTo)
                .IsRequired();

            builder.Property(x => x.DisplayOrder)
                .HasDefaultValue(0);

            builder.Property(a => a.ThumbnailUrl)
                .HasMaxLength(DatabaseConstraints.UrlMaxLength)
                .IsRequired()
                .IsUnicode(false);

            builder.Property(x => x.IsPublished)
                .HasDefaultValue(false);

            builder.HasIndex(x => x.Name)
                .IsUnique();
        }
    }
}
