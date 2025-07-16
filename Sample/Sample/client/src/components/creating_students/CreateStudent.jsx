import { useState } from "react";
import { toast } from "react-toastify";

const CreateStudent = () => {
  const [newID, setNewID] = useState(0);
  const [newName, setNewName] = useState("");
  const [newMarks1, setNewMarks1] = useState(0);
  const [newMarks2, setNewMarks2] = useState(0);
  const [newMarks3, setNewMarks3] = useState(0);
  const [newMarks4, setNewMarks4] = useState(0);
  const subjects = ["Math", "Science", "History", "English"];

  const createNewStudent = async (e) => {
    e.preventDefault();
    if (
      newID === null ||
      newID === undefined ||
      newName.trim() === "" ||
      newMarks1 === null ||
      newMarks1 === undefined ||
      newMarks2 === null ||
      newMarks2 === undefined ||
      newMarks3 === null ||
      newMarks3 === undefined ||
      newMarks4 === null ||
      newMarks4 === undefined
    ) {
      toast.error("Fields are missing values");
    } else if (
      newMarks1 < 0 ||
      newMarks1 > 100 ||
      newMarks2 < 0 ||
      newMarks2 > 100 ||
      newMarks3 < 0 ||
      newMarks3 > 100 ||
      newMarks4 < 0 ||
      newMarks4 > 100
    ) {
      toast.warning("Please make sure the scores are between 1 and 100");
    } else {
      const student = {
        id: newID,
        name: newName,
        subject1: subjects[0],
        subject2: subjects[1],
        subject3: subjects[2],
        subject4: subjects[3],
        marks1: newMarks1,
        marks2: newMarks2,
        marks3: newMarks3,
        marks4: newMarks4,
        totalMarks: total,
        percentage: percentage,
      };

      try {
        const res = await fetch("/Student", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(student),
        });

        res.ok
          ? toast.success("Student Created")
          : toast.error("Student not created");
      } catch (error) {
        console.log("Error occured ", error);
      }
    }
  };

  const total = newMarks1 + newMarks2 + newMarks3 + newMarks4;
  const percentage = (total / 400) * 100;

  return (
    <>
      <label className="form-label">Create New Student</label>
      <div>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter the new student's ID"
          onChange={(e) => setNewID(Number(e.target.value))}
        ></input>
      </div>
      <div>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Name of the Student"
          onChange={(e) => setNewName(e.target.value)}
        ></input>
      </div>

      <div>
        <input
          type="number"
          className="form-control mb-3"
          placeholder={`Enter Math Marks`}
          onChange={(e) => setNewMarks1(Number(e.target.value))}
        ></input>
      </div>

      <div>
        <input
          type="number"
          className="form-control mb-3"
          placeholder={`Enter Science Marks`}
          onChange={(e) => setNewMarks2(Number(e.target.value))}
        ></input>
      </div>
      <div>
        <input
          type="number"
          className="form-control mb-3"
          placeholder={`Enter English Marks`}
          onChange={(e) => setNewMarks3(Number(e.target.value))}
        ></input>
      </div>
      <div>
        <input
          type="number"
          className="form-control mb-3"
          placeholder={`Enter History Marks`}
          onChange={(e) => setNewMarks4(Number(e.target.value))}
        ></input>
      </div>
      <div>
        <input
          type="number"
          className="form-control mb-3"
          placeholder="Total Marks"
          value={total}
          readOnly
        ></input>
      </div>
      <div>
        <input
          type="number"
          className="form-control mb-3"
          placeholder="Percentage"
          value={percentage}
          readOnly
        ></input>
      </div>

      <button className="btn btn-primary" onClick={createNewStudent}>
        Create this Student
      </button>
    </>
  );
};

export default CreateStudent;
