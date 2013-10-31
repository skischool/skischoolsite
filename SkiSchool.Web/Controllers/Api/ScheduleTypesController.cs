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
    public class ScheduleTypesController : ApiController
    {
        private readonly string _clientToken = Config.ClientToken;

        private string _scheduleTypesUrl = ApiRoutes.ScheduleTypes;

        // GET api/employeetypes
        public IEnumerable<ScheduleType> Get()
        {
            HttpStatusCode httpStatusCode;

            var scheduleTypesUri = new Uri(string.Format(_scheduleTypesUrl, _clientToken));

            var scheduleTypes = Invoke.Get<List<ScheduleType>>(scheduleTypesUri, out httpStatusCode);

            return scheduleTypes.OrderBy(e => e.Description).ToList();
        }
    }
}
