using System;
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
            services.AddSingleton<CommentRepository>();
            services.AddSingleton<IssueRepository>();
            services.AddSingleton<ProjectRepository>();
            services.AddSingleton<UserRepository>();
            
            return services;
        }
    }
}
