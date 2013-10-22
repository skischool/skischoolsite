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
    public class EmployeeTitlesController : ApiController
    {
        private readonly string _clientToken = Config.ClientToken;

        private string _employeeTitlesUrl = ApiRoutes.EmployeeTitles;

        // GET api/employeetypes
        public IEnumerable<EmployeeTitle> Get()
        {
            HttpStatusCode httpStatusCode;

            var employeeTitlesUri = new Uri(string.Format(_employeeTitlesUrl, _clientToken));

            var employeeTitles = Invoke.Get<List<EmployeeTitle>>(employeeTitlesUri, out httpStatusCode);

            return employeeTitles.OrderBy(e => e.Description).ToList();
        }
    }
}
