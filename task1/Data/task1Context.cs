
using Microsoft.EntityFrameworkCore;
using System.Security.AccessControl;
using task1.Models;

namespace task1.Data
{
    public class task1Context : DbContext
    {
        //private DbSet<Customer> Customer;
        public task1Context(DbContextOptions<task1Context> options) : base(options)
        {
        }

        public DbSet<Customer> Customer { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Store> Store { get; set; }
        public DbSet<Sales> Sales { get; set; }

    }
}
