using System;
using System.Collections.Generic;

using Domain.Enums;

namespace Domain.Entities
{
    public class Issue
    {
        public int Id { get; set; }
        public string Summary { get; set; }
        public string Description { get; set; }
        public IssuePriority Priority { get; set; }
        public IssueStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation property that holds a reference to a single user entity
        public virtual int ReporterId { get; set; }
        public virtual User Reporter { get; set; }
        
        // Navigation property that holds a reference to a single project entity
        public virtual int ProjectId { get; set; }
        public virtual Project Project { get; set; }

        // Navigation property that contains reference to a single assignee
        public virtual int? AssigneeId { get; set; }
        public virtual User? Assignee { get; set; }

        // Navigation property that contains references to many related comments
        public virtual IEnumerable<Comment>? Comments { get; set; }
    }
}
