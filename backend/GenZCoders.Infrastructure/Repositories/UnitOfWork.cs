using GenZCoders.Application.Abstractions.Presistance;
using GenZCoders.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace GenZCoders.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly GenZDbContext _context;

        public UnitOfWork(GenZDbContext context)
        {
            _context = context;
        }

        public Task BeginTransactionAsync(CancellationToken cancellationToken = default)
        {
            return _context.Database.BeginTransactionAsync(cancellationToken);
        }

        public async Task SaveChangesAsync(CancellationToken ct = default)
        {
            await _context.SaveChangesAsync(ct);
        }
    }
}
