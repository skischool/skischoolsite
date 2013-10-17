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

        private string _allSchedules = ApiRoutes.AllSchedules;

        // GET api/schedules
        public List<Schedule> GetEmployeeSchedules(int? employeeId)
        {
            HttpStatusCode httpStatusCode;

            if (employeeId != null)
            {
                var employeeSchedulesUri = new Uri(string.Format(_employeeSchedules, int.Parse(employeeId.ToString()), _clientToken));

                var employeeSchedules = Invoke.Get<List<Schedule>>(employeeSchedulesUri, out httpStatusCode);

                return employeeSchedules.OrderBy(s => s.Date).ToList();
            }
            else
            {
                var availableSchedulesUri = new Uri(string.Format(_availableSchedules, _clientToken));

                var availableSchedules = Invoke.Get<List<Schedule>>(availableSchedulesUri, out httpStatusCode);

                return availableSchedules.OrderBy(s => s.Date).ToList();
            }
        }

        // GET api/schedules
        public List<Schedule> GetAllSchedules()
        {
            HttpStatusCode httpStatusCode;

            var allSchedulesUri = new Uri(string.Format(_allSchedules, _clientToken));

            var allSchedules = Invoke.Get<List<Schedule>>(allSchedulesUri, out httpStatusCode);

            var groupedSchedules = from s in allSchedules
                                    group s by new { s.Date, s.Start, s.ShiftTypeId } into grp
                                    select new Schedule()
                                    {
                                        Id = grp.Max(t => t.Id),
                                        Date = grp.FirstOrDefault().Date.AddHours(7),
                                        Start = grp.FirstOrDefault().Start.AddHours(7),
                                        End = grp.FirstOrDefault().End.AddHours(7),
                                        ShiftTypeId = grp.FirstOrDefault().ShiftTypeId,
                                        ShiftTypeName = grp.FirstOrDefault().ShiftType.Name,
                                        ShiftTypeDescription = grp.FirstOrDefault().ShiftTypeDescription,
                                        PriorityId = grp.FirstOrDefault().PriorityId,
                                        SeasonName = grp.FirstOrDefault().SeasonName,
                                        SeasonDescription = grp.FirstOrDefault().SeasonDescription,
                                        SeasonId = grp.FirstOrDefault().SeasonId,
                                        Count = grp.Count()
                                    };

            return groupedSchedules.OrderBy(s => s.Date)
                                   .ThenBy(s => s.Start)
                                   .ThenBy(s => s.ShiftTypeId)
                                   .ToList();
        }


        // GET api/schedules?
        public List<Schedule> GetAvailableSchedules(int shiftType, int employeeId, int? month)
        {
            HttpStatusCode httpStatusCode;

            var availableSchedulesUri = new Uri(string.Format(_availableSchedules, _clientToken));

            var availableSchedules = Invoke.Get<List<Schedule>>(availableSchedulesUri, out httpStatusCode);

            var employeeSchedulesUri = new Uri(string.Format(_employeeSchedules, int.Parse(employeeId.ToString()), _clientToken));

            var employeeSchedules = Invoke.Get<List<Schedule>>(employeeSchedulesUri, out httpStatusCode);

            var employeeSelectedDates = employeeSchedules.Select(e => e.Date);

            var availableSchedulesByType = availableSchedules.Where(s => s.ShiftTypeId == shiftType && !employeeSelectedDates.Contains(s.Date));

            var groupedAvailableSchedulesByType = from s in availableSchedulesByType
                                                  group s by new { s.Date, s.Start } into grp
                                                  select new Schedule()
                                                  {
                                                      Id = grp.Max(t => t.Id),
                                                      Date = grp.FirstOrDefault().Date,
                                                      Start = grp.FirstOrDefault().Start,
                                                      End = grp.FirstOrDefault().End,
                                                      ShiftTypeId = grp.FirstOrDefault().ShiftTypeId,
                                                      PriorityId = grp.FirstOrDefault().PriorityId,
                                                      SeasonId = grp.FirstOrDefault().SeasonId,
                                                      Count = grp.Count()
                                                  };

            return month != null ? 
                groupedAvailableSchedulesByType.Where(s => s.Date.Month == month).OrderBy(s => s.Date).ToList() : 
                groupedAvailableSchedulesByType.OrderBy(s => s.Date).ToList();
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

