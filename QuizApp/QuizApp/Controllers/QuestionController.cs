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

        [Route("api/GetQuestions")]
        public IEnumerable<QuestionOption> GetQuestions()
        {
            var questions = quizContext.QuestionOptions;

            return questions;
        }

        public JsonResult AddQuestions(QuestionOption newQuestion)
        {
            QuestionOption question = new QuestionOption()
            {
                Question = newQuestion.Question,
                Option1 = newQuestion.Option1,
                Option2 = newQuestion.Option2,
                Option3 = newQuestion.Option3,
                CorrectAnswer = newQuestion.CorrectAnswer
            };

            quizContext.QuestionOptions.Add(question);
            quizContext.SaveChanges();

            return Json(newQuestion);
        }

        public IEnumerable<HighScore> GetScores()
        {

            var result = quizContext.HighScores;

            var topScoreByPlayer = quizContext.HighScores.GroupBy(x => x.UserId)
                 .Select(x => x.OrderByDescending(y => y._HighScore).First())
                 .OrderByDescending(x => x._HighScore).ThenByDescending(d => d.DateTime);

            return topScoreByPlayer;
        }

        public string ReceiveScore(int score, string userName)
        {
            userName = userName.Trim();
            var user = quizContext.User.Where(x => x.Email == userName).FirstOrDefault();
            
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with name '{userName}'.");
            }

            HighScore scores = new HighScore()
            {
                _HighScore = score,

                User = user,
                UserId = quizContext.Users.Where(u => u.Email == userName).Single().Id,
                UserName = userName,
                DateTime = DateTime.Now.ToString()
            };
            
            quizContext.HighScores.Add(scores);
            quizContext.SaveChanges();

            return score.ToString();
        }

    }
}