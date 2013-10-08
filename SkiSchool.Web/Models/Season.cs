using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SkiSchool.Web.Models
{
    public class Season
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime Start { get; set; }

        public DateTime End { get; set; }

        public int Id { get; set; }
    }
}