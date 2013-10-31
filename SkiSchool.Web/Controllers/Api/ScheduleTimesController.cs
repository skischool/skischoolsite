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
    public class ScheduleTimesController : ApiController
    {
        private readonly string _clientToken = Config.ClientToken;

        private string _scheduleTimesUrl = ApiRoutes.ScheduleTimes;

        // GET api/employeetimes
        public IEnumerable<ScheduleTime> Get()
        {
            HttpStatusCode httpStatusCode;

            var scheduleTimesUri = new Uri(string.Format(_scheduleTimesUrl, _clientToken));

            var scheduleTimes = Invoke.Get<List<ScheduleTime>>(scheduleTimesUri, out httpStatusCode);

            return scheduleTimes.OrderBy(e => e.Description).ToList();
        }
    }
}
