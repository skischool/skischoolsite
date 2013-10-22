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
    public class GendersController : ApiController
    {
        private readonly string _clientToken = Config.ClientToken;

        private string _gendersUrl = ApiRoutes.Genders;

        // GET api/employeetypes
        public IEnumerable<Gender> Get()
        {
            HttpStatusCode httpStatusCode;

            var gendersUri = new Uri(string.Format(_gendersUrl, _clientToken));

            var genders = Invoke.Get<List<Gender>>(gendersUri, out httpStatusCode);

            return genders.OrderBy(e => e.Description).ToList();
        }
    }
}
