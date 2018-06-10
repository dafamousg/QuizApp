using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizApp.Models
{
    public abstract class BaseEntity
    {
        public Guid Id { get; set; }
    }
}
