using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using task1.Models;

namespace task1.Controllers
{
    public class StoreController : Controller
    {
        private readonly StoreDataAccessDataLayer storomerDal;

        public StoreController(StoreDataAccessDataLayer storomerDal)
        {
            this.storomerDal = storomerDal;
        }

        [HttpGet]
        [Route("api/Store/Index")]
        public IEnumerable<Store> Index()
        {
            return storomerDal.GetAllStores();
        }
        [HttpPost]
        [Route("api/Store/Create")]
        public int Create(Store Store)
        {
            return storomerDal.AddStore(Store);
        }
        [HttpGet]
        [Route("api/Store/Details/{id}")]
        public Store Details(int id)
        {
            return storomerDal.GetStoreData(id);
        }
        [HttpPut]
        [Route("api/Store/Edit")]
        public int Edit(Store Store)
        {
            return storomerDal.UpdateStore(Store);
        }
        [HttpDelete]
        [Route("api/Store/Delete/{id}")]
        public int Delete(int id)
        {
            return storomerDal.DeleteStore(id);
        }
    }
}
