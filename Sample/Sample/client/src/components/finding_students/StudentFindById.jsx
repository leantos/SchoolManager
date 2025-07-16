import { useState } from "react";
import StudentTable from "../table_stuff/StudentTable";

const StudentFindById = () => {
  const [student, setStudent] = useState([]);
  const [id, setId] = useState(1);

  const findById = async (e) => {
    if(isNaN(id)){
        alert("Enter a valid number please");
    }
    e.preventDefault();
    try {
      const res = await fetch(`/Student/${id}`);
      const text = await res.text();
      const data = text ? JSON.parse(text) : [];

      setStudent([data]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <label className="form-label">Enter Student ID</label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter the student ID if you know"
            onChange={(e) => setId(e.target.value)}
          ></input>
          <button className="btn btn-primary" onClick={findById}>
            Find
          </button>
        </div>
      </div>

      <StudentTable students={student} />
    </>
  );
};

export default StudentFindById;
