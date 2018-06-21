
using Microsoft.EntityFrameworkCore;
using QuizApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace QuizApp.Data
{
    public class QuizContext : IdentityDbContext
    {
        public QuizContext(DbContextOptions<QuizContext> options) : base(options) {}

        public DbSet<User> User { get; set; }
        public DbSet<QuestionOption> QuestionOptions { get; set; }
        public DbSet<HighScore> HighScores { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

    }
}
