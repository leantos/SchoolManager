using System;
using System.ComponentModel.DataAnnotations;

namespace Sample.Models
{
    public class StudentModel
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Subject1 { get; set; }

        public required string Subject2 { get; set; }
        public required string Subject3 { get; set; }
        public required string Subject4 { get; set; }

        public int Marks1 { get; set; }
        public int Marks2 { get; set; }
        public int Marks3 { get; set; }
        public int Marks4 { get; set; }
        public int TotalMarks { get; set; }
        public float Percentage { get; set; }
    }

}

