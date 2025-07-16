import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateByID = ({
  current_Id,
  current_Name,
  current_Marks1,
  current_Marks2,
  current_Marks3,
  current_Marks4,
  current_Total,
  current_Percentage,
}) => {
  const [id, setId] = useState(0);
  const [newName, setNewName] = useState("");
  const [newMarks1, setNewMarks1] = useState(0);
  const [newMarks2, setNewMarks2] = useState(0);
  const [newMarks3, setNewMarks3] = useState(0);
  const [newMarks4, setNewMarks4] = useState(0);

  useEffect(() => {
    setId(current_Id);
    setNewName(current_Name);
    setNewMarks1(current_Marks1);
    setNewMarks2(current_Marks2);
    setNewMarks3(current_Marks3);
    setNewMarks4(current_Marks4);
  }, [
    current_Id,
    current_Name,
    current_Marks1,
    current_Marks2,
    current_Marks3,
    current_Marks4,
  ]);

  const subjects = ["Math", "Science", "History", "English"];

  const updateStudent = async (e) => {
    e.preventDefault();
    if (
      newName.trim() === "" ||
      Number.isNaN(newMarks1) ||
      Number.isNaN(newMarks2) ||
      Number.isNaN(newMarks3) ||
      Number.isNaN(newMarks4)
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
      toast.warning("Please make sure the scores are between 0 and 100");
    } else {
      const student = {
        id: id,
        name: newName,
        marks1: newMarks1,
        marks2: newMarks2,
        marks3: newMarks3,
        marks4: newMarks4,
        subject1: subjects[0],
        subject2: subjects[1],
        subject3: subjects[2],
        subject4: subjects[3],
        totalMarks: total,
        percentage: percentage,
      };

      try {
        const res = await fetch(`/Student?id=${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(student),
        });
        if (res.ok) {
          toast.success("Student Details Updated Successfully");
        } else {
          toast.error("Student Details was not Updated");
        }
      } catch (error) {
        toast.error(`Error occured ${error.message}`);
      }
    }
  };

  const total = newMarks1 + newMarks2 + newMarks3 + newMarks4;
  const percentage = (total / 400) * 100;

  return (
    <>
      <label className="form-label">Update Current Student</label>
      <div>
        <input
          type="number"
          className="form-control mb-3"
          value={id}
          placeholder="Enter the student's ID"
          onChange={(e) => setId(Number(e.target.value))}
          readOnly
        ></input>
      </div>
      <div>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Name of the Student"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        ></input>
      </div>

      <div>
        <input
          type="number"
          className="form-control mb-3"
          placeholder={`Enter Math Marks`}
          value={newMarks1}
          onChange={(e) => setNewMarks1(Number(e.target.value))}
        ></input>
      </div>

      <div>
        <input
          type="number"
          className="form-control mb-3"
          placeholder={`Enter Science Marks`}
          value={newMarks2}
          onChange={(e) => setNewMarks2(Number(e.target.value))}
        ></input>
      </div>
      <div>
        <input
          type="number"
          className="form-control mb-3"
          placeholder={`Enter English Marks`}
          value={newMarks3}
          onChange={(e) => setNewMarks3(Number(e.target.value))}
        ></input>
      </div>
      <div>
        <input
          type="number"
          className="form-control mb-3"
          placeholder={`Enter History Marks`}
          value={newMarks4}
          onChange={(e) => setNewMarks4(Number(e.target.value))}
        ></input>
      </div>
      <div>
        <input
          type="number"
          className="form-control mb-3"
          placeholder="Total Marks"
          value={Number.isNaN(total) ? current_Total : total}
          readOnly
        ></input>
      </div>
      <div>
        <input
          type="number"
          className="form-control mb-3"
          placeholder="Percentage"
          value={Number.isNaN(percentage) ? current_Percentage : percentage}
          readOnly
        ></input>
      </div>

      <button className="btn btn-primary" onClick={updateStudent}>
        Update this Student
      </button>
    </>
  );
};

export default UpdateByID;
