using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace SkiSchool.Web.App_Start
{
    public static class ApiRoutes
    {
        public static string EmployeeSchedules
        {
            get
            {
                return ConfigurationManager.AppSettings["EmployeeSchedulesRoute"];
            }
        }

        public static string AvailableSchedules
        {
            get
            {
                return ConfigurationManager.AppSettings["AvailableSchedulesRoute"];
            }
        }

        public static string UpdateScheduleWithEmployeeIdRoute
        {
            get
            {
                return ConfigurationManager.AppSettings["UpdateScheduleWithEmployeeIdRoute"];
            }

        }

        public static string EmployeeWithLoginIdUrl
        {
            get
            {
                return ConfigurationManager.AppSettings["EmployeeWithLoginIdUrl"];
            }
        }

        public static string EmployeeWithIdUrl
        {
            get
            {
                return ConfigurationManager.AppSettings["EmployeeWithIdUrl"];
            }
        }

        public static string SecurityApiUrl
        {
            get
            {
                return ConfigurationManager.AppSettings["SecurityApiUrl"];
            }
        }

        public static string EmployeeApiUrl
        {
            get
            {
                return ConfigurationManager.AppSettings["EmployeeApiUrl"];
            }
        }

    }
}