using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class ExpenseModels
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int Amount { get; set; }
        public string Category { get; set; }
    }
}