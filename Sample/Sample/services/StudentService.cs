using Microsoft.Extensions.Configuration;
using Sample.Models;
using Npgsql;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices.Marshalling;
using Microsoft.AspNetCore.Http.HttpResults;
using System.IO.Pipelines;

namespace Sample.services
{
    public class StudentService
    {
        private readonly IConfiguration _config;

        public StudentService(IConfiguration config)
        {
            _config = config;
        }

        // List all students
        public StudentResponse GetAllStudents(int limit, int offset)
        {
            var students = new List<StudentModel>();
            var connectionString = _config.GetConnectionString("Default");

            using var connection = new NpgsqlConnection(connectionString);
            connection.Open();

            // //Total count
            int total;
            using var countCmd = new NpgsqlCommand("SELECT COUNT(*) FROM STUDENTS", connection);
            total = Convert.ToInt32(countCmd.ExecuteScalar());

            using var sqlCmd = new NpgsqlCommand("SELECT * FROM students ORDER BY id LIMIT @limit OFFSET @offset", connection);
            sqlCmd.Parameters.AddWithValue("@limit", limit);
            sqlCmd.Parameters.AddWithValue("@offset", offset);
            using var readResult = sqlCmd.ExecuteReader();

            while (readResult.Read())
            {
                students.Add(new StudentModel
                {
                    Id = readResult.GetInt32(0),
                    Name = readResult.GetString(1),
                    Subject1 = readResult.GetString(2),
                    Marks1 = readResult.GetInt32(3),
                    Subject2 = readResult.GetString(4),
                    Marks2 = readResult.GetInt32(5),
                    Subject3 = readResult.GetString(6),
                    Marks3 = readResult.GetInt32(7),
                    Subject4 = readResult.GetString(8),
                    Marks4 = readResult.GetInt32(9),
                    TotalMarks = readResult.GetInt32(10),
                    Percentage = readResult.GetFloat(11),
                });
            }
            return new StudentResponse
            {
                TotalCount = total,
                Students = students
            };
        }

        // Input a new student
        public bool NewStudent(StudentModel student)
        {
            var connectionString = _config.GetConnectionString("Default");

            using var connection = new NpgsqlConnection(connectionString);
            connection.Open();

            var sqlInput = new NpgsqlCommand(
                "INSERT INTO students " +
                "(id, name, subject_1, marks1, subject_2, marks2, subject_3, marks3, subject_4, marks4, total_marks, percentage) " +
                "VALUES (@id, @name, @subject1, @marks1, @subject2, @marks2, @subject3, @marks3, @subject4, @marks4, @total_marks, @percentage)",
                connection
            );

            sqlInput.Parameters.AddWithValue("@id", student.Id);
            sqlInput.Parameters.AddWithValue("@name", student.Name ?? (object)DBNull.Value);
            sqlInput.Parameters.AddWithValue("@subject1", student.Subject1 ?? (object)DBNull.Value);
            sqlInput.Parameters.AddWithValue("@marks1", student.Marks1);
            sqlInput.Parameters.AddWithValue("@subject2", student.Subject2 ?? (object)DBNull.Value);
            sqlInput.Parameters.AddWithValue("@marks2", student.Marks2);
            sqlInput.Parameters.AddWithValue("@subject3", student.Subject3 ?? (object)DBNull.Value);
            sqlInput.Parameters.AddWithValue("@marks3", student.Marks3);
            sqlInput.Parameters.AddWithValue("@subject4", student.Subject4 ?? (object)DBNull.Value);
            sqlInput.Parameters.AddWithValue("@marks4", student.Marks4);
            sqlInput.Parameters.AddWithValue("@total_marks", student.TotalMarks);
            sqlInput.Parameters.AddWithValue("@percentage", student.Percentage);

            return sqlInput.ExecuteNonQuery() > 0;
        }

        // Get Student by ID
        public StudentModel? GetStudentByID(int id)
        {
            var connectionString = _config.GetConnectionString("Default");
            using var connection = new NpgsqlConnection(connectionString);
            connection.Open();

            using var sqlCmd = new NpgsqlCommand("SELECT * FROM students WHERE id = @id", connection);
            sqlCmd.Parameters.AddWithValue("@id", id);

            using var readResult = sqlCmd.ExecuteReader();

            if (readResult.Read())
            {
                return new StudentModel
                {
                    Id = readResult.GetInt32(0),
                    Name = readResult.GetString(1),
                    Subject1 = readResult.GetString(2),
                    Marks1 = readResult.GetInt32(3),
                    Subject2 = readResult.GetString(4),
                    Marks2 = readResult.GetInt32(5),
                    Subject3 = readResult.GetString(6),
                    Marks3 = readResult.GetInt32(7),
                    Subject4 = readResult.GetString(8),
                    Marks4 = readResult.GetInt32(9),
                    TotalMarks = readResult.GetInt32(10),
                    Percentage = readResult.GetFloat(11),
                };
            }

            return null;
        }

        //Get Student Details by different fields
        public object FindStudentByFields([FromBody] StudentQuery input, int limit, int offset)
        {
            var connectionString = _config.GetConnectionString("Default");
            using var connection = new NpgsqlConnection(connectionString);
            connection.Open();

            var foundStudents = new List<StudentModel>();

            var sqlInput = new NpgsqlCommand();

            // Checking which columns to query from
            var conditions = new List<String>();

            if (input.Id.HasValue)
            {
                conditions.Add("id = @id");
                sqlInput.Parameters.AddWithValue("@id", input.Id.Value);
            }
            if (input.Marks1.HasValue)
            {
                conditions.Add("marks1 = @marks1");
                sqlInput.Parameters.AddWithValue("@marks1", input.Marks1.Value);
            }
            if (input.Marks2.HasValue)
            {
                conditions.Add("marks2 = @marks2");
                sqlInput.Parameters.AddWithValue("@marks2", input.Marks2.Value);
            }
            if (input.Marks3.HasValue)
            {
                conditions.Add("marks3 = @marks3");
                sqlInput.Parameters.AddWithValue("@marks3", input.Marks3.Value);
            }
            if (input.Marks4.HasValue)
            {
                conditions.Add("marks4 = @marks4");
                sqlInput.Parameters.AddWithValue("@marks4", input.Marks4.Value);
            }
            if (input.Total.HasValue)
            {
                conditions.Add("total_marks = @total");
                sqlInput.Parameters.AddWithValue("@total", input.Total.Value);
            }
            if (input.Percentage.HasValue)
            {
                conditions.Add("percentage = @percentage");
                sqlInput.Parameters.AddWithValue("@percentage", input.Percentage.Value);
            }
            if (!string.IsNullOrEmpty(input.Name))
            {
                conditions.Add("name ilike @name");
                sqlInput.Parameters.AddWithValue("@name", $"%{input.Name}%");
            }

            var whereQuery = conditions.Count > 0 ? " WHERE " + string.Join(" AND ", conditions) : "";
            sqlInput.CommandText = $"SELECT * FROM students {whereQuery} ORDER BY id LIMIT @limit OFFSET @offset;";
            sqlInput.Parameters.AddWithValue("@limit", limit);
            sqlInput.Parameters.AddWithValue("@offset", offset);

            sqlInput.Connection = connection;

            using var readResult = sqlInput.ExecuteReader();

            while (readResult.Read())
            {
                foundStudents.Add(new StudentModel
                {
                    Id = readResult.GetInt32(0),
                    Name = readResult.GetString(1),
                    Subject1 = readResult.GetString(2),
                    Marks1 = readResult.GetInt32(3),
                    Subject2 = readResult.GetString(4),
                    Marks2 = readResult.GetInt32(5),
                    Subject3 = readResult.GetString(6),
                    Marks3 = readResult.GetInt32(7),
                    Subject4 = readResult.GetString(8),
                    Marks4 = readResult.GetInt32(9),
                    TotalMarks = readResult.GetInt32(10),
                    Percentage = readResult.GetFloat(11),
                });
            }
            readResult.Close();

            var countSql = $"SELECT COUNT(*) FROM students {whereQuery};";
            var countCmd = new NpgsqlCommand(countSql, connection);
            foreach (NpgsqlParameter param in sqlInput.Parameters)
            {
                if (param.ParameterName != "@limit" && param.ParameterName != "@offset")
                {
                    countCmd.Parameters.AddWithValue(param.ParameterName, param.Value);
                }
            }
            var count = Convert.ToInt32(countCmd.ExecuteScalar());

            return new { results = foundStudents, Count = count };
            ;
        }

        //Find a student by Name
        public List<StudentModel> FindStudentByName(String Name)
        {
            var connectionString = _config.GetConnectionString("Default");
            using var connection = new NpgsqlConnection(connectionString);
            connection.Open();

            var students = new List<StudentModel>();
            NpgsqlCommand sqlInput;
            if (string.IsNullOrWhiteSpace(Name))
            {
                sqlInput = new NpgsqlCommand("SELECT * FROM STUDENTS", connection);
            }
            else
            {
                sqlInput = new NpgsqlCommand("SELECT * from students where lower(name) like lower(@name)", connection);
                sqlInput.Parameters.AddWithValue("@name", $"%{Name}%");
            }

            using var readResult = sqlInput.ExecuteReader();

            while (readResult.Read())
            {
                students.Add(new StudentModel
                {
                    Id = readResult.GetInt32(0),
                    Name = readResult.GetString(1),
                    Subject1 = readResult.GetString(2),
                    Marks1 = readResult.GetInt32(3),
                    Subject2 = readResult.GetString(4),
                    Marks2 = readResult.GetInt32(5),
                    Subject3 = readResult.GetString(6),
                    Marks3 = readResult.GetInt32(7),
                    Subject4 = readResult.GetString(8),
                    Marks4 = readResult.GetInt32(9),
                    TotalMarks = readResult.GetInt32(10),
                    Percentage = readResult.GetFloat(11),
                });
            }

            return students;
        }

        // Update Student Detail by ID
        public bool UpdateStudent(StudentModel student, int id)
        {
            var connectionString = _config.GetConnectionString("Default");
            using var connection = new NpgsqlConnection(connectionString);
            connection.Open();

            var currentDetails = GetStudentByID(id);
            if (currentDetails == null)
                return false;

            var sqlInput = new NpgsqlCommand(
                "UPDATE students SET " +
                "name = @newname, " +
                "subject_1 = @new_s_1, " +
                "marks1 = @new_m_1, " +
                "subject_2 = @new_s_2, " +
                "marks2 = @new_m_2, " +
                "subject_3 = @new_s_3, " +
                "marks3 = @new_m_3, " +
                "subject_4 = @new_s_4, " +
                "marks4 = @new_m_4, " +
                "total_marks = @new_total, " +
                "percentage = @new_percentage " +
                "WHERE id = @id",
                connection
            );

            sqlInput.Parameters.AddWithValue("@id", id);
            sqlInput.Parameters.AddWithValue("@newname", student.Name);
            sqlInput.Parameters.AddWithValue("@new_s_1", student.Subject1);
            sqlInput.Parameters.AddWithValue("@new_m_1", student.Marks1);
            sqlInput.Parameters.AddWithValue("@new_s_2", student.Subject2);
            sqlInput.Parameters.AddWithValue("@new_m_2", student.Marks2);
            sqlInput.Parameters.AddWithValue("@new_s_3", student.Subject3);
            sqlInput.Parameters.AddWithValue("@new_m_3", student.Marks3);
            sqlInput.Parameters.AddWithValue("@new_s_4", student.Subject4);
            sqlInput.Parameters.AddWithValue("@new_m_4", student.Marks4);
            sqlInput.Parameters.AddWithValue("@new_total", student.TotalMarks);
            sqlInput.Parameters.AddWithValue("@new_percentage", student.Percentage);

            return sqlInput.ExecuteNonQuery() > 0;
        }

        public bool DeleteStudent(int id)
        {
            var connectionString = _config.GetConnectionString("Default");
            using var connection = new NpgsqlConnection(connectionString);
            connection.Open();
            using var sqlCmd = new NpgsqlCommand("DELETE FROM students WHERE id = @id", connection);
            sqlCmd.Parameters.AddWithValue("@id", id);
            return sqlCmd.ExecuteNonQuery() > 0;
        }
    }
}
