using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SkiSchool.Web.Filters;

namespace SkiSchool.Web.Controllers
{
    [Authorize(Roles = "Admin")]
    public class SecurityController : Controller
    {
        //
        // GET: /Security/

        public ActionResult Index()
        {
            ViewBag.EmployeeId = HttpContext.Session["employeeId"].ToString();

            return View();
        }

    }
}
