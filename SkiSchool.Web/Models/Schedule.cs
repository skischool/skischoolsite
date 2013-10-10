using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SkiSchool.Web.Models
{
    public class Schedule
    {
        public bool Assigned { get; set; }

        public bool CanAdd { get; set; }

        public bool CanRemove { get; set; }

        public bool CanUpdate { get; set; }

        public int ClientId { get; set; }

        public DateTime Date { get; set; }

        public DateTime Start { get; set; }

        public DateTime End { get; set; }

        public int Id { get; set; }

        public int? EmployeeId { get; set; }

        public int PriorityId { get; set; }

        public int SeasonId { get; set; }

        public int ShiftTypeId { get; set; }

        public Priority Priority { get; set; }

        public Season Season { get; set; }

        public ShiftType ShiftType { get; set; }

        public int Count { get; set; }
    }
}