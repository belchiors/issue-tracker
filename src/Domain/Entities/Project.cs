﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual IEnumerable<Issue>? Issues { get; set; } = Enumerable.Empty<Issue>();
    }
}
