using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using task1.Data;
using Microsoft.Extensions.Configuration;

namespace task1.Models
{
    public class SalesDataAccessDataLayer
    {
        task1Context db;

        public SalesDataAccessDataLayer(task1Context context)
        {
            db = context;
        }
        public IEnumerable<Sales> GetAllSaless()
        {
            try
            {
                var salesList = db.Sales
                                    .Include(s => s.Customer)
                                    .Include(s => s.Product)
                                    .Include(s => s.Store)
                                    .ToList();
                return salesList;
            }
            catch
            {
                throw;
            }
        }
        public int AddSales(Sales sales)
        {
            try
            {
                db.Sales.Add(sales);
                db.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }
        public int UpdateSales(Sales sales)
        {
            try
            {
                db.Entry(sales).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        public Sales GetSalesData(int id)
        {
            try
            {
                Sales sales = db.Sales
                                .Include(s => s.Customer)
                                .Include(s => s.Product)
                                .Include(s => s.Store)
                                .Where(s => s.Id == id)
                                .SingleOrDefault();
                return sales;
            }
            catch
            {
                throw;
            }
        }
        public int DeleteSales(int id)
        {
            try
            {
                Sales emp = db.Sales.Find(id);
                db.Sales.Remove(emp);
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
