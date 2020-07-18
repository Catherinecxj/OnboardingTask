using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using task1.Models;
using task1.Data;

namespace task1.Controllers

{

    public class SalesController : Controller
    {
        private readonly SalesDataAccessDataLayer salesDal;
        private readonly CustomerDataAccessDataLayer customerDal;
        private readonly ProductDataAccessDataLayer productDal;
        private readonly StoreDataAccessDataLayer storeDal;

        public SalesController(SalesDataAccessDataLayer salesDal,
            CustomerDataAccessDataLayer customerDal,
            ProductDataAccessDataLayer productDal,
            StoreDataAccessDataLayer storeDal)
        {
            this.salesDal = salesDal;
            this.customerDal = customerDal;
            this.productDal = productDal;
            this.storeDal = storeDal;
        }

        [HttpGet]
        [Route("api/Sales/Index")]
        public IEnumerable<Sales> Index()
        {
            var salesList = salesDal.GetAllSaless();
            return salesList;
        }
        [HttpPost]
        [Route("api/Sales/Create")]
        public int Create(Sales Sales)
        {
            return salesDal.AddSales(Sales);
        }
        [HttpGet]
        [Route("api/Sales/Details/{id}")]
        public Object Details(int id)
        {
            var salData = salesDal.GetSalesData(id);
            var custList = customerDal.GetAllCustomers().OrderBy(x=>x.Name).ToList();
            var prodList = productDal.GetAllProducts().OrderBy(x => x.Name).ToList();
            var storeList = storeDal.GetAllStores().OrderBy(x => x.Name).ToList();

            return new
            {
                SalData = salData,
                CustList = custList,
                ProdList = prodList,
                StoreList = storeList
            };

        }

        [HttpGet]
        [Route("api/Sales/GetEmptyDetails")]
        public Object GetEmptyDetails()
        {
            var custList = customerDal.GetAllCustomers().OrderBy(x => x.Name).ToList();
            var prodList = productDal.GetAllProducts().OrderBy(x => x.Name).ToList();
            var storeList = storeDal.GetAllStores().OrderBy(x => x.Name).ToList();

            return new
            {
                SalData = new Sales() { DateSold = DateTime.Now },
                CustList = custList,
                ProdList = prodList,
                StoreList = storeList
            };
        }   

        [HttpPut]
        [Route("api/Sales/Edit")]
        public int Edit(Sales Sales)
        {
            return salesDal.UpdateSales(Sales);
        }
        [HttpDelete]
        [Route("api/Sales/Delete/{id}")]
        public int Delete(int id)
        {
            return salesDal.DeleteSales(id);
        }
    }
}
