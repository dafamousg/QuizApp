using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizApp.Models
{
    public class Question : BaseEntity
    {
        public Question() { }

        public string Question_ { get; set; }
        public string OptionA {get;set;}
        public string OptionB {get;set;}
        public string OptionC { get; set; }
        public string CorrectAnswer { get; set; }
    }
}
