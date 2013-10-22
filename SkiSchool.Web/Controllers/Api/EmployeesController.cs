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
    public class EmployeesController : ApiController
    {
        private readonly string _clientToken = Config.ClientToken;

        private string _employeeWithLoginIdUrl = ApiRoutes.EmployeeWithLoginIdUrl;

        private string _employeeWithIdUrl = ApiRoutes.EmployeeWithIdUrl;

        private string _employeesUrl = ApiRoutes.Employees;

        private string _employeeUpdateUrl = ApiRoutes.UpdateEmployeeUrl;

        // GET api/employees
        public List<Employee> GetAll()
        {
            HttpStatusCode httpStatusCode;

            var employeesUri = new Uri(string.Format(_employeesUrl, _clientToken));

            var employees = Invoke.Get<List<Employee>>(employeesUri, out httpStatusCode);

            return employees.OrderBy(e => e.Person.LastName).ToList();
        }

        // PUT api/employees?{id}
        [HttpPut]
        public Employee Put([FromUri]int id, [FromBody]Employee employee)
        {
            HttpStatusCode httpStatusCode;

            var employeeUpdateUrl = string.Format(_employeeUpdateUrl, id, _clientToken);

            var employeeUpdateUri = new Uri(employeeUpdateUrl);

            var updatedEmployee = Invoke.Put<Employee>(employeeUpdateUri, employee, out httpStatusCode);

            return updatedEmployee;
        }

        // GET api/employees/5
        public Employee Get(int? loginId, int? id)
        {
            HttpStatusCode httpStatusCode;

            if (id == null)
            {
                var employeeWithLoginIdUri = new Uri(string.Format(_employeeWithLoginIdUrl, loginId, _clientToken));

                var employee = Invoke.Get<Employee>(employeeWithLoginIdUri, out httpStatusCode);

                return employee;
            }

            if (loginId == null)
            {
                var employeeWithIdUri = new Uri(string.Format(_employeeWithIdUrl, id, _clientToken));

                var employee = Invoke.Get<Employee>(employeeWithIdUri, out httpStatusCode);

                return employee;
            }

            return new Employee();
        }
    }
}

