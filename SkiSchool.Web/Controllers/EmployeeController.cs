using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SkiSchool.Web.Filters;

namespace SkiSchool.Web.Controllers
{
    [Authorize]
    public class EmployeeController : Controller
    {
        //
        // GET: /Employee/

        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /Employee/Details?id=1

        [Authorize(Roles = "Admin,Manager,User")]
        public ActionResult Details(int id)
        {
            HttpContext.Session["employeeId"] = id.ToString();

            return View();
        }

    }
}
