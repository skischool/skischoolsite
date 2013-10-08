using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SkiSchool.Web.Controllers
{
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

        public ActionResult Details(int id)
        {

            return View();
        }

    }
}
