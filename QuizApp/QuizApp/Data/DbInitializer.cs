using QuizApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizApp.Data
{
    public class DbInitializer
    {
        public static void Initializer(QuizContext context)
        {
            context.Database.EnsureCreated();

            if (context.Questions.Any())
            {
                return;   // DB has been seeded
            }

            var question_and_Answers = new Question[]
            {
                new Question{Question_="What animal kills the most humans every year?", OptionA="Mosquitoes", OptionB="Humans", OptionC="Scorpions", CorrectAnswer="Mosquitoes"},
                new Question{Question_="Which planet has the longest day?", OptionA="Jupiter", OptionB = "Saturn", OptionC="Venus", CorrectAnswer="Venus"},
                new Question{Question_="What percentage of DNA do humans share with bananas?", OptionA="50%", OptionB="70%", OptionC="40%", CorrectAnswer="50%"},
                new Question{Question_="When were oreos invented?", OptionA="1987", OptionB="1912", OptionC="1953", CorrectAnswer="1912"},
                new Question{Question_="what is the tallest structure in the world?", OptionA="Shanghai Tower", OptionB="Burj Khalifa", OptionC="One World Trade Center", CorrectAnswer="Burj Khalifa"}
            };

            foreach (var question in question_and_Answers)
            {
                context.Questions.Add(question);
            }

            context.SaveChanges();

        }
    }
}
