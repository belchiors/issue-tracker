using System;

namespace Domain.Entities
{
    public class Comment
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        
        // Navigation property that holds a reference to a single user entity
        public virtual Guid UserId { get; set; }
        public virtual User Author { get; set; }

        // Navigation property that holds a reference to a single issue entity
        public virtual Guid IssueId { get; set; }
        public virtual Issue Issue { get; set; }
    }
}
