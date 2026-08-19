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
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");

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

            builder.Property(x => x.Email)
                .IsRequired()
                .HasMaxLength(DatabaseConstraints.EmailMaxLength)
                .IsUnicode(false);

            builder.Property(x => x.PasswordHash)
                .IsRequired()
                .HasMaxLength(512)
                .IsUnicode(false);

            builder.Property(x => x.PhoneNumber)
                .IsRequired()
                .HasMaxLength(DatabaseConstraints.PhoneMaxLength)
                .IsUnicode(false);

            builder.Property(x => x.ProfileImage)
                .HasMaxLength(DatabaseConstraints.UrlMaxLength)
                .IsUnicode(false);

            builder.Property(x => x.Gender)
                .HasConversion<int>();

            builder.Property(x => x.Role)
                .HasConversion<int>();

            builder.Property(x => x.Status)
                .HasConversion<int>();

            builder.Property(x => x.IsActive)
                .HasDefaultValue(true);

            builder.Property(x => x.IsEmailVerified)
                .HasDefaultValue(false);

            builder.HasIndex(x => x.Email)
                .IsUnique();

            builder.HasIndex(x => x.PhoneNumber)
                .IsUnique();
        }
    }
}
