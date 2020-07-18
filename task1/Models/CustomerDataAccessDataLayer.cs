using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using task1.Data;
using Microsoft.Extensions.Configuration;

namespace task1.Models
{
    public class CustomerDataAccessDataLayer
    {
        task1Context db;

        public CustomerDataAccessDataLayer(task1Context context)
        { 
            db = context;
        }
        public IEnumerable<Customer> GetAllCustomers()
        {
            try
            {
                var customerList = db.Customer.ToList();
                return customerList;
            }
            catch
            {
                throw;
            }
        }
        public int AddCustomer(Customer customer)
        {
            try
            {
                db.Customer.Add(customer);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        public int UpdateCustomer(Customer customer)
        {
            try
            {
                db.Entry(customer).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        public Customer GetCustomerData(int id)
        {
            try
            {
                Customer customer = db.Customer.Find(id);
                return customer;
            }
            catch
            {
                throw;
            }
        }
        public int DeleteCustomer(int id)
        {
            try
            {
                Customer emp = db.Customer.Find(id);
                db.Customer.Remove(emp);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}
