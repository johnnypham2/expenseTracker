using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<ExpenseModels> ExpenseInfo { get; set; }
        public DbSet<UserModels>  UserInfo { get; set; }
        public AppDbContext (DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating (ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}