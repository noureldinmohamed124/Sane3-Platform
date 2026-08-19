using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Domain
{
    public static class DatabaseConstraints
    {
        // Names
        public const int NameMaxLength = 100;

        // Contact
        public const int EmailMaxLength = 256;
        public const int PhoneMaxLength = 20;

        // Education
        public const int CityMaxLength = 100;
        public const int InstitutionNameMaxLength = 200;
        public const int FacultyMaxLength = 150;
        public const int AcademicLevelMaxLength = 100;
        public const int CurrentLevelMaxLength = 50;

        // Course
        public const int TitleMaxLength = 150;

        // URLs
        public const int UrlMaxLength = 500;

        // General Text
        public const int ShortTextMaxLength = 250;
        public const int DescriptionMaxLength = 2000;
        public const int NotesMaxLength = 1000;

        // Security
        public const int PasswordHashMaxLength = 512;
        public const int RefreshTokenHashMaxLength = 512;

        // Devices
        public const int DeviceInfoMaxLength = 300;
        public const int IpAddressMaxLength = 45;
    }
}
