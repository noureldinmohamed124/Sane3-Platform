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
    internal class PaymentConfiguration : IEntityTypeConfiguration<Payment>
    {
        public void Configure(EntityTypeBuilder<Payment> builder)
        {
            builder.ToTable("Payments");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Amount)
                .HasPrecision(10, 2);

            builder.Property(x => x.ScreenshotUrl)
                .IsRequired()
                .HasMaxLength(DatabaseConstraints.UrlMaxLength)
                .IsUnicode(false);

            builder.Property(x => x.ScreenshotPublicId)
                .IsRequired()
                .HasMaxLength(DatabaseConstraints.UrlMaxLength)
                .IsUnicode(false);

            builder.Property(x => x.Status)
                .HasConversion<int>();

            builder.Property(x => x.Notes)
                .HasMaxLength(DatabaseConstraints.NotesMaxLength)
                .IsUnicode();


            builder.HasIndex(x => x.EnrollmentApplicationId)
                .IsUnique();

            builder.HasIndex(x => x.Status);

            builder.HasOne(x => x.EnrollmentApplication)
                .WithOne(x => x.Payment)
                .HasForeignKey<Payment>(x => x.EnrollmentApplicationId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.VerifiedByUser)
                .WithMany()
                .HasForeignKey(x => x.VerifiedByUserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
