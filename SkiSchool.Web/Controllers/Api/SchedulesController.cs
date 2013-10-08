using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SkiSchool.Web.App_Start;
using SkiSchool.Web.Helpers;
using SkiSchool.Web.Models;

namespace SkiSchool.Web.Controllers.Api
{
    public class SchedulesController : ApiController
    {
        private readonly string _clientToken = Config.ClientToken;

        private string _employeeSchedules = ApiRoutes.EmployeeSchedules;

        private string _availableSchedules = ApiRoutes.AvailableSchedules;

        private string _updateScheduleWithEmployeeId = ApiRoutes.UpdateScheduleWithEmployeeIdRoute;

        // GET api/schedules
        public List<Schedule> Get(int? employeeId)
        {
            HttpStatusCode httpStatusCode;

            if (employeeId != null)
            {
                var employeeSchedulesUri = new Uri(string.Format(_employeeSchedules, int.Parse(employeeId.ToString()), _clientToken));

                var schedules = Invoke.Get<List<Schedule>>(employeeSchedulesUri, out httpStatusCode);

                return schedules;
            }
            else
            {
                var availableSchedulesUri = new Uri(string.Format(_availableSchedules, _clientToken));

                var schedules = Invoke.Get<List<Schedule>>(availableSchedulesUri, out httpStatusCode);

                return schedules;
            }
        }


        // PUT api/schedules?id={scheduleId}
        public Schedule Put([FromUri]int scheduleId, [FromBody]Schedule schedule)
        {
            HttpStatusCode httpStatusCode;

            var updateScheduleWithEmployeeIdUri = new Uri(string.Format(_updateScheduleWithEmployeeId, scheduleId, _clientToken));

            var updatedSchedule = Invoke.Put<Schedule>(updateScheduleWithEmployeeIdUri, schedule, out httpStatusCode);

            return updatedSchedule;
        }

    }
}

