using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using task1.Models;

namespace task1.Controllers
{
    public class ProductController : Controller
    {
        private readonly ProductDataAccessDataLayer productDal;

        public ProductController(ProductDataAccessDataLayer productDal)
        {
            this.productDal = productDal;
        }

        [HttpGet]
        [Route("api/Product/Index")]
        public IEnumerable<Product> Index()
        {
            return productDal.GetAllProducts();
        }
        [HttpPost]
        [Route("api/Product/Create")]
        public int Create(Product Product)
        {
            return productDal.AddProduct(Product);
        }
        [HttpGet]
        [Route("api/Product/Details/{id}")]
        public Product Details(int id)
        {
            return productDal.GetProductData(id);
        }
        [HttpPut]
        [Route("api/Product/Edit")]
        public int Edit(Product Product)
        {
            return productDal.UpdateProduct(Product);
        }
        [HttpDelete]
        [Route("api/Product/Delete/{id}")]
        public int Delete(int id)
        {
            return productDal.DeleteProduct(id);
        }
    }
}
