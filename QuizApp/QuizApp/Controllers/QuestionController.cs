using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QuizApp.Data;
using QuizApp.Models;

namespace QuizApp.Controllers
{
    [Produces("application/json")]
    public class QuestionController : Controller
    {
        private readonly QuizContext quizContext;
        private readonly UserManager<User> userManager;


        public QuestionController(QuizContext context, UserManager<User> user)
        {
            quizContext = context;
            userManager = user;
        }

        [Route("GetQuestions")]
        public IEnumerable<Question> GetQuestions()
        {
            var questions = quizContext.Questions;

            return questions;
        }

        public JsonResult AddQuestions(Question newQuestion)
        {
            Question question = new Question()
            {
                Question_ = newQuestion.Question_,
                OptionA = newQuestion.OptionA,
                OptionB = newQuestion.OptionB,
                OptionC = newQuestion.OptionC,
                CorrectAnswer = newQuestion.CorrectAnswer
            };

            quizContext.Questions.Add(question);
            quizContext.SaveChanges();
            return Json(question);
        }

        public IEnumerable<Score> GetScores()
        {

            var result = quizContext.Scores;

            var topScoreByPlayer = quizContext.Scores.GroupBy(x => x.UserId)
                 .Select(x => x.OrderByDescending(y => y.Result).First())
                 .OrderByDescending(x => x.Result).ThenByDescending(d => d.DateTime);

            return topScoreByPlayer;
        }

        public string ReceiveScore(int score, string userName)
        {
            var user = quizContext.Users.Where(x => x.Email == userName).FirstOrDefault();
            
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with name '{userName}'.");
            }

            Score scores = new Score()
            {
                Result = score,

                User = user,
                UserId = quizContext.Users.Where(u => u.Email == userName).Single().Id,
                UserName = userName,
                DateTime = DateTime.Now.ToString()
            };
            
            quizContext.Scores.Add(scores);
            quizContext.SaveChanges();

            return score.ToString();
        }

    }
}