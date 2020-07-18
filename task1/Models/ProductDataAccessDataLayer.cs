using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using task1.Data;
using Microsoft.Extensions.Configuration;

namespace task1.Models
{
    public class ProductDataAccessDataLayer
    {
        task1Context db;

        public ProductDataAccessDataLayer(task1Context context)
        {
            db = context;
        }
        public IEnumerable<Product> GetAllProducts()
        {
            try
            {
                var productList = db.Product.ToList();
                return productList;
            }
            catch
            {
                throw;
            }
        }
        public int AddProduct(Product product)
        {
            try
            {
                db.Product.Add(product);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        public int UpdateProduct(Product product)
        {
            try
            {
                db.Entry(product).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        public Product GetProductData(int id)
        {
            try
            {
                Product product = db.Product.Find(id);
                return product;
            }
            catch
            {
                throw;
            }
        }
        public int DeleteProduct(int id)
        {
            try
            {
                Product emp = db.Product.Find(id);
                db.Product.Remove(emp);
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
