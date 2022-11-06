using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace Infrastructure.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Issue> Issues { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Defines email as a unique field for user.
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Explicity defines issue description as optional
            modelBuilder.Entity<Issue>()
                .Property(e => e.Description)
                .IsRequired(false);

            // Explicity defines project description as optional
            modelBuilder.Entity<Project>()
                .Property(p => p.Description)
                .IsRequired(false);

            // Explicity defines url description as optional
            modelBuilder.Entity<Project>()
                .Property(p => p.Url)
                .IsRequired(false);

            // An issue can be assigned to many users, each user can be assigned to many issues.
            modelBuilder.Entity<Issue>()
                .HasMany(i => i.Assignees)
                .WithMany(u => u.AssignedIssues);

            // An issue is reported by one user, each user may report many issues.
            modelBuilder.Entity<Issue>()
                .HasOne(e => e.Reporter)
                .WithMany()
                .IsRequired();

            // An issue is associated with exacly one project, each project may have many issues.
            modelBuilder.Entity<Issue>()
                .HasOne(e => e.Project)
                .WithMany(p => p.Issues)
                .IsRequired();

            // A comment is associated with exacly one issue, each issue may have many comments.
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Issue)
                .WithMany(e => e.Comments)
                .IsRequired();

            // A comment belongs to exacly one user, and each user may create many comments.
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Author)
                .WithMany()
                .IsRequired();

            // A project is managed by exacly one user, and each user may manage exacly one project.
            modelBuilder.Entity<Project>()
                .HasOne(p => p.Manager)
                .WithMany()
                .IsRequired();
        }
    }
}
