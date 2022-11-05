using System;
using System.Collections.Generic;

using Domain.Enums;

namespace Domain.Entities
{
    public class Issue
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public IssuePriority Priority { get; set; }
        public IssueStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation property that holds a reference to a single user entity
        public Guid UserId { get; set; }
        public User Reporter { get; set; }
        
        // Navigation property that holds a reference to a single project entity
        public Guid ProjectId { get; set; }
        public Project Project { get; set; }

        // Navigation property that contains references to many assined users
        public IEnumerable<User>? Assignees { get; set; }

        // Navigation property that contains references to many related comments
        public IEnumerable<Comment>? Comments { get; set; }
    }
}
