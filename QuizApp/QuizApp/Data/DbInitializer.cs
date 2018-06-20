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

            if (context.QuestionOptions.Any())
            {
                return;   // DB has been seeded
            }

            var question_and_Answers = new QuestionOption[]
            {
                new QuestionOption{Question="What animal kills the most humans every year?", Option1="Mosquitoes", Option2="Humans", Option3="Scorpions", CorrectAnswer="Mosquitoes"},
                new QuestionOption{Question="Which planet has the longest day?", Option1="Jupiter", Option2 = "Saturn", Option3="Venus", CorrectAnswer="Venus"},
                new QuestionOption{Question="What percentage of DNA do humans share with bananas?", Option1="50%", Option2="70%", Option3="40%", CorrectAnswer="50%"},
                new QuestionOption{Question="When were oreos invented?", Option1="1987", Option2="1912", Option3="1953", CorrectAnswer="1912"},
                new QuestionOption{Question="what is the tallest structure in the world?", Option1="Shanghai Tower", Option2="Burj Khalifa", Option3="One World Trade Center", CorrectAnswer="Burj Khalifa"}
            };

            foreach (var question in question_and_Answers)
            {
                context.QuestionOptions.Add(question);
            }

            context.SaveChanges();

        }
    }
}
