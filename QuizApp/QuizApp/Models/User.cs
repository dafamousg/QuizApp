using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace QuizApp.Models
{
    public class User : IdentityUser
    {
        public List<HighScore> Scores { get; set; }
    }
}
