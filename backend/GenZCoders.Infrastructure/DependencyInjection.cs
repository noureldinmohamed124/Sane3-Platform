using GenZCoders.Application.Abstractions.FileStorage;
using GenZCoders.Application.Abstractions.Presistance;
using GenZCoders.Infrastructure.Data;
using GenZCoders.Infrastructure.FileStorage;
using GenZCoders.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenZCoders.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            // DbContext
            services.AddDbContext<GenZDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("AspTest")));

            // Repositories
            services.AddScoped(typeof(IGenericRepo<>),typeof(GenericRepo<>));
            services.AddScoped<ICourseRepo, CourseRepo>();
            services.AddScoped<IEnrollmentApplicationRepo, EnrollmentApplicationRepo>();
            services.AddScoped<IAcademyProgramRepo, AcademyProgramRepo>();

            // UnitOfWork
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            // Cloudinary
            services.Configure<CloudinarySettings>(configuration.GetSection(CloudinarySettings.SectionName));;
            services.AddScoped<IFileStorageService, CloudinaryFileStorageService>();

            return services;
        }
    }
}
