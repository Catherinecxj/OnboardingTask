using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace task1.Models
{
    public class Sales
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        [ForeignKey("Customer")]
        public int CustomerId { get; set; }
        [ForeignKey("Store")]
        public int StoreId { get; set; }

        public DateTime DateSold { get; set; }

        public Customer Customer { get; set; }
        public Product Product { get; set; }
        public Store Store { get; set; }

    }
}
