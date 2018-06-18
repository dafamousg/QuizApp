using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizApp.Models
{
    public class Score
    {
        public int Id { get; set; }
        public int Result { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public User User { get; set; }
        public string DateTime { get; set; }
    }
}
