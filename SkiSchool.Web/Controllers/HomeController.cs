using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SkiSchool.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            if (HttpContext.Session["employeeId"] != null)
                ViewBag.EmployeeId = HttpContext.Session["employeeId"].ToString();

            return View();
        } 
    }
}
