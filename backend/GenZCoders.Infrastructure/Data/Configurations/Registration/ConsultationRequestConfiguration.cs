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
    internal class ConsultationRequestConfiguration : IEntityTypeConfiguration<ConsultationRequest>
    {
        public void Configure(EntityTypeBuilder<ConsultationRequest> builder)
        {
            builder.ToTable("ConsultationRequests");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(DatabaseConstraints.NameMaxLength)
                .IsUnicode();

            builder.Property(x => x.Phone)
                .IsRequired()
                .HasMaxLength(DatabaseConstraints.PhoneMaxLength)
                .IsUnicode(false);

            builder.Property(x => x.Email)
                .IsRequired()
                .HasMaxLength(DatabaseConstraints.EmailMaxLength)
                .IsUnicode(false);

            builder.Property(x => x.EducationLevel)
                .IsRequired()
                .HasMaxLength(DatabaseConstraints.CurrentLevelMaxLength)
                .IsUnicode();

            builder.Property(x => x.Notes)
                .HasMaxLength(DatabaseConstraints.NotesMaxLength)
                .IsUnicode();

            builder.Property(x => x.MeetingLink)
                .HasMaxLength(DatabaseConstraints.UrlMaxLength)
                .IsUnicode(false);

            builder.Property(x => x.Status)
                .HasConversion<int>();

            builder.Property(x => x.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.HasIndex(x => x.Email);

            builder.HasIndex(x => x.Phone);

            builder.HasIndex(x => x.Status);

            builder.HasOne(x => x.InterestedProgram)
                .WithMany()
                .HasForeignKey(x => x.InterestedProgramId)
                .OnDelete(DeleteBehavior.SetNull);

            builder.HasOne(x => x.AssignedInstructor)
                .WithMany()
                .HasForeignKey(x => x.AssignedInstructorId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
