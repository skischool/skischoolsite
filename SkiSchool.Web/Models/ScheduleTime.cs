using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SkiSchool.Web.Models
{
    public class ScheduleTime
    {
        public string Description { get; set; }

        public string Name { get; set; }

        public DateTime Start { get; set; }

        public DateTime End { get; set; }

        public string StartEnd 
        {
            get
            {
                return Start.TimeOfDay.ToString() + " - " + End.TimeOfDay.ToString();
            }
        }

        public int Id { get; set; }
    }
}