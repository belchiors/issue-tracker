using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Infrastructure;
using System;
using Application;

var builder = WebApplication.CreateBuilder(args);

// Get the connection string whether the environment is production or development
string connectionString = builder.Environment.IsProduction()
    ? Environment.GetEnvironmentVariable("DATABASE_URL")!
    : builder.Configuration.GetConnectionString("LocalConnection");

// Get JTW security key whether the environment is production or development
string securityKey = builder.Environment.IsProduction()
    ? Environment.GetEnvironmentVariable("JWTSecurityKey")!
    : builder.Configuration.GetValue<string>("JWTSecurityKey");

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices();
builder.Services.AddDbContext(connectionString);
builder.Services.ConfigureAuthenticationServices(securityKey);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");;

app.Run();
