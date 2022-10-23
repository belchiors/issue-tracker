﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Enums
{
    public enum IssueStatus
    {
        Open,
        Fixed,
        Closed,
        Review,

        [EnumMember(Value = "In Progress")]
        InProgress
    }
}