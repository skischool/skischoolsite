using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SkiSchool.Web.Helpers;
using SkiSchool.Web.Models;

namespace SkiSchool.Web.Controllers.Api
{
    public class SchedulesController : ApiController
    {
        private readonly string _clientToken = @"578DB399-7047-4E82-921D-DA51E8F14A4E";

        private string _employeeSchedules = @"http://scheduleapi.resortdataservices.com/api/employees/{0}/shifts?clienttoken={1}";

        private string _availableSchedules = @"http://scheduleapi.resortdataservices.com/api/shifts/available?clienttoken={0}";

        private string _updateScheduleWithEmployeeId = @"http://scheduleapi.resortdataservices.com/api/shifts/{0}?clienttoken={1}";

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

