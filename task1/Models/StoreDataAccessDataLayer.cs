using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using task1.Data;
using Microsoft.Extensions.Configuration;

namespace task1.Models
{
    public class StoreDataAccessDataLayer
    {
        task1Context db;

        public StoreDataAccessDataLayer(task1Context context)
        {
            db = context;
        }
        public IEnumerable<Store> GetAllStores()
        {
            try
            {
                var storeList = db.Store.ToList();
                return storeList;
            }
            catch
            {
                throw;
            }
        }
        public int AddStore(Store store)
        {
            try
            {
                db.Store.Add(store);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        public int UpdateStore(Store store)
        {
            try
            {
                db.Entry(store).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        public Store GetStoreData(int id)
        {
            try
            {
                Store store = db.Store.Find(id);
                return store;
            }
            catch
            {
                throw;
            }
        }
        public int DeleteStore(int id)
        {
            try
            {
                Store emp = db.Store.Find(id);
                db.Store.Remove(emp);
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
