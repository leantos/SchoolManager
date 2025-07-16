using System;

namespace Sample.Models
{
    public class StudentQuery
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public int? Marks1 { get; set; }
        public int? Marks2 { get; set; }
        public int? Marks3 { get; set; }
        public int? Marks4 { get; set; }
        public int? Total { get; set; }
        public float? Percentage{ get; set; }

    }
}