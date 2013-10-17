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

        public string PriorityName { get; set; }

        public string PriorityDescription { get; set; }

        public int SeasonId { get; set; }

        public string SeasonName { get; set; }

        public string SeasonDescription { get; set; }

        public int ShiftTypeId { get; set; }

        public string ShiftTypeName { get; set; }

        public string ShiftTypeDescription { get; set; }

        public Priority Priority { get; set; }

        public Season Season { get; set; }

        public ShiftType ShiftType { get; set; }

        public int Count { get; set; }
    }
}