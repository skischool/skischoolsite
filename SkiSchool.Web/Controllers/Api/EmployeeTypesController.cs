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
    public class EmployeeTypesController : ApiController
    {
        private readonly string _clientToken = Config.ClientToken;

        private string _employeeTypesUrl = ApiRoutes.EmployeeTypes;

        // GET api/employeetypes
        public IEnumerable<EmployeeType> Get()
        {
            HttpStatusCode httpStatusCode;

            var employeeTypesUri = new Uri(string.Format(_employeeTypesUrl, _clientToken));

            var employeeTypes = Invoke.Get<List<EmployeeType>>(employeeTypesUri, out httpStatusCode);

            return employeeTypes.OrderBy(e => e.Description).ToList();
        }
    }
}
