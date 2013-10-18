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
    public class SecurityController : ApiController
    {
        private readonly UsersContext _usersContext;

        private readonly string _clientToken = Config.ClientToken;

        private string _employeesUrl = ApiRoutes.Employees;

        public SecurityController()
        {
            _usersContext = new UsersContext();
        }
        
        // GET api/security
        public IEnumerable<UserEmployeeInfo> Get()
        {
            HttpStatusCode httpStatusCode;

            var employeesUri = new Uri(string.Format(_employeesUrl, _clientToken));

            var employees = Invoke.Get<List<Employee>>(employeesUri, out httpStatusCode);

            var userInfos = _usersContext.UserInfos;

            var userEmployeeInfo = from e in employees
                                   join u in userInfos
                                   on e.LoginId equals u.UserId
                                   select new UserEmployeeInfo()
                                   {
                                        UserId = u.UserId,
                                        Username = u.Username,
                                        RoleId = u.RoleId,
                                        RoleName = u.RoleName,
                                        CreateDate = u.CreateDate,
                                        EmployeeId = e.Id,
                                        PersonId = e.Person.Id,
                                        LastName = e.Person.LastName,
                                        FirstName = e.Person.FirstName,
                                        MiddleName = e.Person.MiddleName
                                   };

            return userEmployeeInfo;
        }

        
    }
}
