using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using task1.Models;

namespace task1.Controllers
{
    public class CustomerController : Controller
    {
        private readonly CustomerDataAccessDataLayer customerDal;

        public CustomerController(CustomerDataAccessDataLayer customerDal)
        {
            this.customerDal = customerDal;
        }

        [HttpGet]
        [Route("api/Customer/Index")]
        public IEnumerable<Customer> Index()
        {
            return customerDal.GetAllCustomers();
        }
        [HttpPost]
        [Route("api/Customer/Create")]
        public int Create(Customer Customer)
        {
            return customerDal.AddCustomer(Customer);
        }
        [HttpGet]
        [Route("api/Customer/Details/{id}")]
        public Customer Details(int id)
        {
            return customerDal.GetCustomerData(id);
        }
        [HttpPut]
        [Route("api/Customer/Edit")]
        public int Edit(Customer Customer)
        {
            return customerDal.UpdateCustomer(Customer);
        }
        [HttpDelete]
        [Route("api/Customer/Delete/{id}")]
        public int Delete(int id)
        {
            return customerDal.DeleteCustomer(id);
        }
    }
}
