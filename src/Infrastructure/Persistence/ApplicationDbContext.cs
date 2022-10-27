using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Issue> Issues { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<User> Users { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Issue>()
                .HasOne<User>(issue => issue.User)
                .WithMany(user => user.Issues)
                .OnDelete(DeleteBehavior.SetNull)
                .HasForeignKey(issue => issue.UserId);

            modelBuilder.Entity<User>()
                .HasMany<Issue>(user => user.AssignedIssues)
                .WithMany(issue => issue.Assignees);

            modelBuilder.Entity<Project>()
                .HasMany<Issue>(project => project.Issues)
                .WithOne(issue => issue.Project)
                .HasForeignKey(issue => issue.ProjectId);
        }
    }
}
