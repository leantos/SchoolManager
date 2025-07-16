import { useState } from "react";
import StudentTable from "../table_stuff/StudentTable";

const StudentFindByName = () => {
  const [name, setName] = useState("");
  const [students, setStudents] = useState([]);

  const handleFindByName = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/Student/name/${name}`);
      const text = await res.text();
      const data = text ? JSON.parse(text) : [];
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students by name:", error);
    }
  };

  return (
    <>
      <div className="d-flex flex-col justify-content-between align-items-center mb-1">
        <label className="form-label">Find Student by Name</label>
        <button
          className="btn btn-light"
          onClick={(e) => {
            e.preventDefault();
            
          }}
        >
          Close
        </button>
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          placeholder="You can also enter part of their name to find them"
        ></input>
        <button className="btn btn-primary" onClick={handleFindByName}>
          Find
        </button>
      </div>

      <StudentTable students={students} />
    </>
  );
};

export default StudentFindByName;
