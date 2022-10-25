using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Issue
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int UserId { get; set; }
        [Required]
        public User? User { get; set; }
        public int ProjectId { get; set; }
        [Required]
        public Project? Project { get; set; }
        public IEnumerable<User>? Assignees { get; set; }
        public IEnumerable<Label>? Labels { get; set; }
        public IssuePriority Priority { get; set; } = IssuePriority.None;
        public IssueStatus? Status { get; set; } = IssueStatus.Open;
        public DateTime CreatedAt { get; set; }
    }
}
