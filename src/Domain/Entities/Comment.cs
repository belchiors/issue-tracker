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
        public Guid UserId { get; set; }
        public User Author { get; set; }

        // Navigation property that holds a reference to a single issue entity
        public Guid IssueId { get; set; }
        public Issue Issue { get; set; }
    }
}
