using GenZCoders.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Domain.Entities
{
    public class Payment
    {
        public int Id { get; set; }

        public int EnrollmentApplicationId { get; set; }

        public decimal Amount { get; set; }

        public string ScreenshotUrl { get; set; } = string.Empty;
        public string ScreenshotPublicId { get; set; } = string.Empty;
        public string? TransactionReference { get; set; }

        public PaymentStatus Status { get; set; }

        public DateTime UploadedAt { get; set; }

        public DateTime? VerifiedAt { get; set; }

        public int? VerifiedByUserId { get; set; }
        public User? VerifiedByUser { get; set; }

        public string? Notes { get; set; }

        public EnrollmentApplication EnrollmentApplication { get; set; } = null!;
    }
}
