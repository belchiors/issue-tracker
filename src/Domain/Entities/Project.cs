using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Project
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation property that holds a reference to a single project manager
        public virtual Guid UserId { get; set; }
        public virtual User Manager { get; set; }

        // Navigation property that holds references to many related issues
        public virtual IEnumerable<Issue>? Issues { get; set; }
    }
}
