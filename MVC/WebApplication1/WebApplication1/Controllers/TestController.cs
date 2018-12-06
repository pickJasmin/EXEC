using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class TestController : Controller
    {
        public string GetString()
        {
            return "Hello!MVC!";
        }
        public Customer getCustomer()
        {
            Customer ct = new Customer();
            ct.CustomerName = "hao";
            ct.Address= "rnrnr";
            return ct;
        }

    }
}