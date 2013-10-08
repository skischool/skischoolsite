using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SkiSchool.Web.Models
{
    public class Employee
    {
        public string ClientToken { get; set; }

        public bool Current { get; set; }

        public EmployeeTitle EmployeeTitle { get; set; }

        public EmployeeType EmployeeType { get; set; }

        public int Id { get; set; }

        public bool IsLocal { get; set; }

        public int LoginId { get; set; }

        public Person Person { get; set; }

        public string RosterId { get; set; }
    }
}