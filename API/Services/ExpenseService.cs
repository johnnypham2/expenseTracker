using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;

namespace API.Services
{
    public class ExpenseService
    {
        private readonly AppDbContext _context;

        public ExpenseService(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<ExpenseModels> GetAllExpense()
        {
            return _context.ExpenseInfo;
        }

        public bool CreateExpense(ExpenseModels model)
        {
            bool result = false;
            _context.Add(model);
            result = _context.SaveChanges() != 0;
            return result;
        }

        public bool DeleteExpense(int id)
        {
             ExpenseModels FoundExpense = _context.ExpenseInfo.FirstOrDefault(item => item.Id == id);
             if (FoundExpense != null)
             {
            _context.ExpenseInfo.Remove(FoundExpense);

             }
            return _context.SaveChanges() != 0;
        }

        public bool EditExpense(int id, ExpenseModels model)
        {
            ExpenseModels FoundExpense = _context.ExpenseInfo.FirstOrDefault(item => item.Id == id);
            if (FoundExpense != null)
            {
                FoundExpense.Description = model.Description;
                FoundExpense.Amount = model.Amount;
                FoundExpense.Category = model.Category;
                _context.Update<ExpenseModels>(FoundExpense); 
            }
            return _context.SaveChanges() != 0;
        }
    }
}