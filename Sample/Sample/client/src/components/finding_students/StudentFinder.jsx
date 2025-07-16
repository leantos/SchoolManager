import { useState } from "react";
import StudentTable from "../table_stuff/StudentTable";

const StudentFinder = () => {
  // student query data
  const [name, setName] = useState(null);
  const [id, setId] = useState(null);
  const [marks1, setMarks1] = useState(null);
  const [marks2, setMarks2] = useState(null);
  const [marks3, setMarks3] = useState(null);
  const [marks4, setMarks4] = useState(null);
  const [total, setTotal] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [foundStudents, setFoundStudents] = useState([]);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);
  
  //   visibility stuff
  const [visibleMarks1, setVisibleMarks1] = useState(false);
  const [visibleMarks2, setVisibleMarks2] = useState(false);
  const [visibleMarks3, setVisibleMarks3] = useState(false);
  const [visibleMarks4, setVisibleMarks4] = useState(false);
  const [visibleTotal, setVisibleTotal] = useState(false);
  const [visiblePercentage, setVisiblePercentage] = useState(false);

  //button visibility
  const [visibleMarks1Button, setvisibleMarks1Button] = useState(true);
  const [visibleMarks2Button, setvisibleMarks2Button] = useState(true);
  const [visibleMarks3Button, setvisibleMarks3Button] = useState(true);
  const [visibleMarks4Button, setvisibleMarks4Button] = useState(true);
  const [visibleTotalButton, setVisibleTotalButton] = useState(true);
  const [visiblePercentageButton, setVisiblePercentageButton] = useState(true);

  const handleFindStudent = async (e) => {
    e.preventDefault();
    try {
      //   const res = await fetch("/Student");
      //   const text = await res.text();
      //   const data = text ? JSON.parse(text) : [];

      const student_query = {
        id: id,
        name: name,
        marks1: marks1,
        marks2: marks2,
        marks3: marks3,
        marks4: marks4,
        total: total,
        percentage: percentage,
      };

      const res = await fetch("/Student/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student_query),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : [];

      console.log("Students ", data);
      setFoundStudents(data);
      setSuccess(true);
      setMessage(`Found ${data.length} students`);
    } catch (error) {
      setMessage(`Error occured ${error}`);
    }
  };

  return (
    <>
      <div className="d-flex flex-col justify-content-between align-items-center mb-1">
        <label className="form-label">
          Find your Students using any of these fields
        </label>
        <button
          className="btn btn-light"
          onClick={(e) => {
            e.preventDefault();
            setId(null);
            setName(null);
            setMarks1(null);
            setMarks2(null);
            setMarks3(null);
            setMarks4(null);
            setTotal(null);
            setPercentage(null);
          }}
        >
          Clear
        </button>
      </div>
      <input
        type="text"
        className="form-control mb-3"
        onChange={(e) => setId(Number(e.target.value))}
        placeholder="You can enter their Id to find them"
      ></input>
      <input
        type="text"
        className="form-control mb-1"
        onChange={(e) => setName(e.target.value)}
        placeholder="You can also enter part of their name to find them"
      ></input>
      <div className="d-flex flex-row justify-content-start gap-2 my-1">
        {visibleMarks1Button && (
          <button
            className="btn btn-outline-primary w-auto"
            onClick={(e) => {
              e.preventDefault();
              setVisibleMarks1((prev) => !prev);
              setvisibleMarks1Button(false);
            }}
          >
            Math Marks
          </button>
        )}
        {visibleMarks2Button && (
          <button
            className="btn btn-outline-primary w-auto"
            onClick={(e) => {
              e.preventDefault();
              setVisibleMarks2((prev) => !prev);
              setvisibleMarks2Button(false);
            }}
          >
            Science Marks
          </button>
        )}
        {visibleMarks3Button && (
          <button
            className="btn btn-outline-primary w-auto"
            onClick={(e) => {
              e.preventDefault();
              setVisibleMarks3((prev) => !prev);
              setvisibleMarks3Button(false);
            }}
          >
            English Marks
          </button>
        )}
        {visibleMarks4Button && (
          <button
            className="btn btn-outline-primary w-auto"
            onClick={(e) => {
              e.preventDefault();
              setVisibleMarks4((prev) => !prev);
              setvisibleMarks4Button(false);
            }}
          >
            History Marks
          </button>
        )}
        {visibleTotalButton && (
          <button
            className="btn btn-outline-primary w-auto"
            onClick={(e) => {
              e.preventDefault();
              setVisibleTotal((prev) => !prev);
              setVisibleTotalButton(false);
            }}
          >
            Total Marks
          </button>
        )}
        {visiblePercentageButton && (
          <button
            className="btn btn-outline-primary w-auto"
            onClick={(e) => {
              e.preventDefault();
              setVisiblePercentage((prev) => !prev);
              setVisiblePercentageButton(false);
            }}
          >
            Percentage
          </button>
        )}
      </div>
      {visibleMarks1 && (
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setMarks1(Number(e.target.value));
            }}
            placeholder="You can also enter their Math Marks to find them"
          ></input>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              setVisibleMarks1((prev) => !prev);
              setvisibleMarks1Button((prev) => !prev);
            }}
          >
            <i className="bi bi-x fs-6" />
          </button>
        </div>
      )}
      {visibleMarks2 && (
        <div className="input-group mb-3">
          <input
            type="text"
            id="marks2input"
            className="form-control"
            onChange={(e) => setMarks2(Number(e.target.value))}
            placeholder="You can also enter their Science Marks to find them"
          ></input>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              setVisibleMarks2((prev) => !prev);
              setvisibleMarks2Button((prev) => !prev);
            }}
          >
            <i className="bi bi-x fs-6" />
          </button>
        </div>
      )}
      {visibleMarks3 && (
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setMarks3(Number(e.target.value))}
            placeholder="You can also enter their English Marks to find them"
          ></input>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              setVisibleMarks3((prev) => !prev);
              setvisibleMarks3Button((prev) => !prev);
            }}
          >
            <i className="bi bi-x fs-6" />
          </button>
        </div>
      )}
      {visibleMarks4 && (
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setMarks4(Number(e.target.value))}
            placeholder="You can also enter their History Marks to find them"
          ></input>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              setVisibleMarks4((prev) => !prev);
              setvisibleMarks4Button((prev) => !prev);
            }}
          >
            <i className="bi bi-x fs-6" />
          </button>
        </div>
      )}
      {visibleTotal && (
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setTotal(Number(e.target.value))}
            placeholder="You can also enter their Total Marks to find them"
          ></input>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              setVisibleTotal((prev) => !prev);
              setVisibleTotalButton((prev) => !prev);
            }}
          >
            <i className="bi bi-x fs-6" />
          </button>
        </div>
      )}
      {visiblePercentage && (
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setPercentage(Number(e.target.value))}
            placeholder="You can also enter their Percentage to find them"
          ></input>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              setVisiblePercentage((prev) => !prev);
              setVisiblePercentageButton((prev) => !prev);
            }}
          >
            <i className="bi bi-x fs-6" />
          </button>
        </div>
      )}
      <button className="btn btn-primary mt-1 mb-3" onClick={handleFindStudent}>
        Find
      </button>
      {success !== null && (
        <p
          className={
            success
              ? "alert alert-success p-1 text-center"
              : "alert alert-danger p-0 text-center"
          }
        >
          {message}
        </p>
      )}
      <StudentTable students={foundStudents} />
    </>
  );
};

export default StudentFinder;
