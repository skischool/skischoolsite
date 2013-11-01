using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
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

        private string _postSchedule = ApiRoutes.PostSchedule;

        private string _allSchedules = ApiRoutes.AllSchedules;

        private string _scheduleTimeUrl = ApiRoutes.ScheduleTime;

        private string _deleteScheduleUrl = ApiRoutes.DeleteSchedule;

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
        public List<Schedule> GetAllSchedules(bool grouped)
        {
            HttpStatusCode httpStatusCode;

            var allSchedulesUri = new Uri(string.Format(_allSchedules, _clientToken));

            var allSchedules = Invoke.Get<List<Schedule>>(allSchedulesUri, out httpStatusCode);


            if (grouped)
            {
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
            else
            {
                return allSchedules
                                   .OrderBy(s => s.Date)
                                   .ThenBy(s => s.Start)
                                   .ThenBy(s => s.ShiftTypeId)
                                   .Take(50)
                                   .Select(s => new Schedule() {
                                       Id = s.Id,
                                       Date = s.Date.AddHours(7),
                                       Start = s.Start.AddHours(7),
                                       End = s.End.AddHours(7),
                                       ShiftType = s.ShiftType,
                                       PriorityId = s.PriorityId,
                                       Season = s.Season
                                   })
                                   .ToList();
            }
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

        // DELETE api/schedules?id=
        public Schedule Delete([FromUri]int id)
        {
            HttpStatusCode httpStatusCode;

            var deleteScheduleUri = new Uri(string.Format(_deleteScheduleUrl, id, _clientToken));

            var deletedSchedule = Invoke.Delete<Schedule>(deleteScheduleUri, out httpStatusCode);

            return deletedSchedule;
        }

        // POST api/schedules
        public Schedule Post([FromBody]Schedule schedule)
        {
            HttpStatusCode httpStatusCode;

            var scheduleTimeUri = new Uri(string.Format(_scheduleTimeUrl, schedule.ScheduleTimeId, _clientToken));

            var scheduleTime = Invoke.Get<ScheduleTime>(scheduleTimeUri, out httpStatusCode);

            var scheduleStart = scheduleTime.Start;

            var scheduleEnd = scheduleTime.End;

            var scheduleCount = schedule.Count;

            var newSchedule = new Schedule()
            {
                ClientId = 0,
                Date = new DateTime(schedule.Date.Year, schedule.Date.Month, schedule.Date.Day),
                Start = new DateTime(schedule.Date.Year, schedule.Date.Month, schedule.Date.Day, scheduleStart.Hour, scheduleStart.Minute, scheduleStart.Second),
                End = new DateTime(schedule.Date.Year, schedule.Date.Month, schedule.Date.Day, scheduleEnd.Hour, scheduleEnd.Minute, scheduleEnd.Second),
                ShiftType = new ShiftType() { Id = schedule.ShiftTypeId, Name = "Test Name", Description = "Test Description" },
                Season = new Season() { Id = 4, Name = "Test Name", Description = "Test Description", Start = DateTime.Now, End = DateTime.Now.AddDays(100) },
                SeasonId = 4,
                PriorityId = 4,
                Priority = new Priority() { Id = 4, Name = "Test Name", Description = "Test Description" },
                CanAdd = true,
                CanRemove = true,
                CanUpdate = true,
                Assigned = false
            };

            var postScheduleUri = new Uri(string.Format(_postSchedule, _clientToken));

            var postedSchedule = new Schedule(); 

            Parallel.For(0, scheduleCount, i =>
                {
                    postedSchedule = Invoke.Post<Schedule>(postScheduleUri, newSchedule, out httpStatusCode);
                });

            postedSchedule.Count = scheduleCount;

            return postedSchedule;
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

