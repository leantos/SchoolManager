namespace Sample.Models
{
    public class StudentResponse
    {
        public int TotalCount { get; set; }
        public List<StudentModel>? Students {get; set;}
    }
}