using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizApp.Models
{
    public class QuestionOption : BaseEntity
    {
        public string Question { get; set; }
        public string Option1 {get;set;}
        public string Option2 {get;set;}
        public string Option3 { get; set; }
        public string CorrectAnswer { get; set; }
    }
}
