using Microsoft.AspNetCore.Mvc;
using Sample.Models;
using Sample.services;

namespace Sample.controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentController : Controller
    {
        private readonly StudentService _service;

        public StudentController(StudentService service)
        {
            _service = service;
        }

        // Adding a new student
        [HttpPost]
        public IActionResult NewStudent([FromBody] StudentModel student)
        {
            var result = _service.NewStudent(student);
            if (result)
            {
                return Ok("Entered Successfully");
            }
            else
            {
                return BadRequest("Enter Valid Inputs please");
            }
        }

        // Fetching all students
        [HttpGet]
        public IActionResult GetAllStudents([FromQuery] int limit, [FromQuery] int offset)
        {
            var students = _service.GetAllStudents(limit, offset);
            return Ok(students);
        }


        // Fetching a student by ID
        [HttpGet("{id}")]
        public IActionResult GetStudentByID(int id)
        {
            var student_by_id = _service.GetStudentByID(id);
            return student_by_id != null ? Ok(student_by_id) : NotFound("Student does not exist");
        }

        // Fetching a student by name
        [HttpGet("name/{name}")]
        public IActionResult FindStudentByName(string name)
        {
            var student_by_name = _service.FindStudentByName(name);
            return student_by_name != null ? Ok(student_by_name) : NotFound("Student does not exist");
        }

        // Fetching by specific columns
        [HttpPost("search")]
        public IActionResult FindStudentByFields([FromBody] StudentQuery input, [FromQuery] int limit, [FromQuery] int offset)
        {
            var result = _service.FindStudentByFields(input, limit, offset);
            return Ok(result);
        }

        // Updating a student by ID
        [HttpPut]
        public IActionResult UpdateStudent(int id, [FromBody] StudentModel student)
        {
            var result = _service.UpdateStudent(student, id);
            return result ? Ok("Updated Successfully") : BadRequest("Enter Valid Inputs please");
        }

        // Deleting a student by ID

        [HttpDelete]
        public IActionResult DeleteStudent(int id)
        {
            var result = _service.DeleteStudent(id);
            return result ? Ok("Deleted Successfully") : NotFound("Student does not exist");
        }

    }
}
