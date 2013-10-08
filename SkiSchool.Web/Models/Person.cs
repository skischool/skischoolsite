using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SkiSchool.Web.Models
{
    public class Person
    {
        public DateTime DateOfBirth { get; set; }

        public string FirstName { get; set; }

        public int GenderId { get; set; }

        public int Id { get; set; }

        public string LastName { get; set; }

        public string MiddleName { get; set; }
    }
}