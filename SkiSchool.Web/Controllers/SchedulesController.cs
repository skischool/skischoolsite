using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SkiSchool.Web.Filters;

namespace SkiSchool.Web.Controllers
{
    [Authorize(Roles = "Admin")]
    public class SchedulesController : Controller
    {
        //
        // GET: /Schedules/

        public ActionResult Index()
        {
            ViewBag.EmployeeId = HttpContext.Session["employeeId"].ToString();

            return View();
        }

        //
        // GET: /Schedules/Details

        public ActionResult Details()
        {
            ViewBag.EmployeeId = HttpContext.Session["employeeId"].ToString();

            return View();
        }

    }
}
