using System.Text;
using Application.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddSingleton<AccountService>();
        services.AddSingleton<ProjectService>();

        return services;
    }
    
    /// <summary>
    /// This method configures authentication services using JTW Bearer.
    /// </summary>
    public static IServiceCollection ConfigureAuthenticationServices(this IServiceCollection services, string securityKey)
    {
        services.AddSingleton<TokenService>(tokenService => new TokenService(securityKey));
        
        services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.ASCII.GetBytes(securityKey))
                };
            });

        return services;
    }
}