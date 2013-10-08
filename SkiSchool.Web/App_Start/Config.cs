using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace SkiSchool.Web.App_Start
{
    public static class Config
    {
        public static string ClientToken
        {
            get
            {
                return ConfigurationManager.AppSettings["ClientToken"];
            }
        }
    }
}