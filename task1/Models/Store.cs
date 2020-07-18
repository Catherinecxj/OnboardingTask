using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace task1.Models
{
    public class Store
    {
        [Key]
        public int Id { get; set; }
        [StringLength(100)]
        public string Name { get; set; }
        [StringLength(100)]
        public string Address { get; set; }

    }

}
