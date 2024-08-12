using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExpenseController : ControllerBase
    {
        private readonly ExpenseService _data;

        public ExpenseController(ExpenseService data)
        {
            _data = data;
        }

// Get All Expenses
    [HttpGet("GetAllExpense")]

    public IEnumerable<ExpenseModels> GetAllExpense()
    {
        return _data.GetAllExpense();
    }

//Edit Expense
[HttpPost("EditExpense")]
    public bool EditExpense(int id, ExpenseModels model)
    {
        return _data.EditExpense(id, model);
    }

    //create Expense
    [HttpPost("CreateExpense")]
    public bool CreateExpense(ExpenseModels model)
    {
        return _data.CreateExpense(model);
    }

    //Delete Expense
    [HttpDelete("DeleteExpense")]
    public bool DeleteExpense(int id)
    {
        return _data.DeleteExpense(id);
    }
    }
}