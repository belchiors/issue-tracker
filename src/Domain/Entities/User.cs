using System;
using System.Collections.Generic;

using Domain.Enums;

namespace Domain.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public UserRole Role { get; set; } = UserRole.User;
        // Navigation property that holds references to many assigned issues
        public IEnumerable<Issue> AssignedIssues { get; set; }
    }
}
