using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SkiSchool.Web.Models
{
    public class User
    {
        public string ClientToken { get; set; }

        public int Id { get; set; }

        public string Username { get; set; }
    }
}