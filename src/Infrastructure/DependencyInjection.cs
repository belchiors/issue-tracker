using System;
using Domain.Interfaces;
using Infrastructure.Persistence;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public static class DependencyInjection
    {
        public static void AddDbContext(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                var version = new MySqlServerVersion(new Version(8, 0, 30));
                options.UseMySql(connectionString, version, null);
            });
        }
        
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
        {
            // services.AddScoped<CommentRepository>();
            services.AddScoped<IIssueRepository, IssueRepository>();
            services.AddScoped<IProjectRepository, ProjectRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            
            return services;
        }
    }
}
