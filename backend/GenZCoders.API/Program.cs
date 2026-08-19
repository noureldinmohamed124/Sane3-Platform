using GenZCoders.API.Middlewares;
using GenZCoders.Application.Modules.AcademyPrograms.Queries.GetAllAcademyPrograms;
using GenZCoders.Application.Modules.Courses.Queries.GetAllCoursesByProgram;
using GenZCoders.Application.Modules.EnrollmentApplications.Commands.CreateEnrollmentApplication;
using GenZCoders.Infrastructure;
using GenZCoders.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);


// Add Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendOnly",
        policy =>
        {
            policy.WithOrigins(
                    "https://gen-z-coders-platform.vercel.app",
                    "http://localhost:5173",
                    "https://localhost:5173"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});





// Add services to the container.

builder.Services.AddControllers();


// Load App Settings File
builder.Configuration.AddJsonFile("appsettings.Local.json", optional: true, reloadOnChange: true);



// Infrastructure (Repositories, File Storage, JWT Implementation)
builder.Services.AddInfrastructure(builder.Configuration);



// Use Cases
builder.Services.AddScoped<CreateEnrollmentApplicationUseCase>();
builder.Services.AddScoped<GetAllAcademyProgramsUseCase>();
builder.Services.AddScoped<GetAllCoursesByProgramUseCase>();


// 5. JWT Configurations



// force lowercase URLs
builder.Services.AddRouting(options =>
{
    options.LowercaseUrls = true;
});



// When converting enums to/from JSON → use names instead of numbers
builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters
            .Add(new JsonStringEnumConverter());
    });




// Swagger (optional)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseHttpsRedirection();

app.UseCors("FrontendOnly");

app.UseAuthorization();

app.MapControllers();

app.Run();




/*
 
    Install-Package Microsoft.EntityFrameworkCore -Version 8.0.20 (Infrastructure)
    Install-Package Microsoft.EntityFrameworkCore.Tools -Version 8.0.20 (Infrastructure)
    Install-Package Microsoft.EntityFrameworkCore.SqlServer -Version 8.0.20 (Infrastructure)
    Install-Package CloudinaryDotNet -Version 1.29.0 (Infrastructure)
    Install-Package Microsoft.Extensions.Options.ConfigurationExtensions -Version 9.0.0 (Infrastructure)
 
    Install-Package Microsoft.EntityFrameworkCore -Version 8.0.20 ()

    Install-Package FluentValidation -Version 12.1.0 (Application)

    Install-Package Microsoft.EntityFrameworkCore.Design -Version 8.0.20 (Api)
 

    Add-Migration InitialCreate -OutputDir Data/Migrations
*/
