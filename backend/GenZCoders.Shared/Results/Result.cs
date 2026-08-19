using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Shared.Results
{
    public sealed class Result
    {
        public bool IsSuccess { get; init; }
        public string? Error { get; init; }

        public static Result Success()
        {
            return new Result
            {
                IsSuccess = true
            };
        }

        public static Result Failure(string error)
        {
            return new Result
            {
                IsSuccess = false,
                Error = error
            };
        }
    }
}
