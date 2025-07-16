import "./App.css";
import { useState } from "react";
import StudentFindById from "./components/finding_students/StudentFindById";
import StudentFindByName from "./components/finding_students/StudentFindByName";
import DeleteByID from "./components/deleting_students/DeleteByID";
import UpdateByID from "./components/updating_students/UpdateByID";
import CreateStudent from "./components/creating_students/CreateStudent";
import Header from "./components/header/Header";
import SideBar from "./components/header/SideBar";
import ShowAllStudents from "./components/show_all_students/ShowAllStudents";
import StudentFinder from "./components/finding_students/StudentFinder";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [message, setMessage] = useState("");

  //conditional rendering states
  const [showAllStudentsTrue, setShowAllStudentsTrue] = useState(true);
  const [findStudentTrue, setFindStudentTrue] = useState(false);
  const [findByNameTrue, setFindByNameTrue] = useState(false);
  const [findByIdTrue, setFindByIdTrue] = useState(false);
  const [deleteByIdTrue, setDeleteByIdTrue] = useState(false);
  const [updateByIdTrue, setUpdateByIdTrue] = useState(false);
  const [createStudentTrue, setCreateStudentTrue] = useState(false);

  //for updating
  const [current_Id, setCurrent_Id] = useState(0);
  const [current_Name, setCurrent_Name] = useState("");
  const [current_Marks1, setCurrent_Marks1] = useState(0);
  const [current_Marks2, setCurrent_Marks2] = useState(0);
  const [current_Marks3, setCurrent_Marks3] = useState(0);
  const [current_Marks4, setCurrent_Marks4] = useState(0);
  const [current_Total, setCurrent_Total] = useState(0);
  const [current_Percentage, setCurrent_Percentage] = useState(0);

  //for deleting
  const [deleteId, setDeleteId] = useState(0);
  const [deleteName, setDeleteName] = useState("");
  const [deleteMarks1, setDeleteMarks1] = useState(0);
  const [deleteMarks2, setDeleteMarks2] = useState(0);
  const [deleteMarks3, setDeleteMarks3] = useState(0);
  const [deleteMarks4, setDeleteMarks4] = useState(0);
  const [deleteTotal, setDeleteTotal] = useState(0);
  const [deletePercentage, setDeletePercentage] = useState(0);

  useState(() => {
    fetch("/api/hello")
      .then((res) => res.text())
      .then((data) => setMessage(data));
  }, []);

  // useState(() => {
  //   fetch("/Student")
  //     .then((res) => res.json())
  //     .then((data) => setStudents(data));
  // }, []);

  return (
    <>
      <Header message={message} />
      <div className="mx-0 p-0 d-flex">
        <SideBar
          //show all students
          showAllStudentsTrue={showAllStudentsTrue}
          setShowAllStudentsTrue={setShowAllStudentsTrue}
          // find students
          findByIdTrue={findByIdTrue}
          findByNameTrue={findByNameTrue}
          findStudentTrue={findStudentTrue}
          setFindByIdTrue={setFindByIdTrue}
          setFindByNameTrue={setFindByNameTrue}
          setFindStudentTrue={setFindStudentTrue}
          // delete student
          deleteByIdTrue={deleteByIdTrue}
          setDeleteByIdTrue={setDeleteByIdTrue}
          // update student
          updateByIdTrue={updateByIdTrue}
          setUpdateByIdTrue={setUpdateByIdTrue}
          //create student
          createStudentTrue={createStudentTrue}
          setCreateStudentTrue={setCreateStudentTrue}
        />
        <div
          className="d-flex flex-column px-3 w-75 ms-auto z--1"
          style={{ paddingTop: "85px" }}
        >
          {showAllStudentsTrue && (
            <ShowAllStudents
              //state boolean stuff
              setShowAllStudentsTrue={setShowAllStudentsTrue}
              setUpdateByIdTrue={setUpdateByIdTrue}
              //updating content
              setCurrent_Id={setCurrent_Id}
              setCurrent_Name={setCurrent_Name}
              setCurrent_Marks1={setCurrent_Marks1}
              setCurrent_Marks2={setCurrent_Marks2}
              setCurrent_Marks3={setCurrent_Marks3}
              setCurrent_Marks4={setCurrent_Marks4}
              setCurrent_Total={setCurrent_Total}
              setCurrent_Percentage={setCurrent_Percentage}
              //Deleting content
              deleteId={deleteId}
              deleteName={deleteName}
              deleteMarks1={deleteMarks1}
              deleteMarks2={deleteMarks2}
              deleteMarks3={deleteMarks3}
              deleteMarks4={deleteMarks4}
              deleteTotal={deleteTotal}
              deletePercentage={deletePercentage}
              //Deleting content assignments
              setDeleteId={setDeleteId}
              setDeleteName={setDeleteName}
              setDeleteMarks1={setDeleteMarks1}
              setDeleteMarks2={setDeleteMarks2}
              setDeleteMarks3={setDeleteMarks3}
              setDeleteMarks4={setDeleteMarks4}
              setDeleteTotal={setDeleteTotal}
              setDeletePercentage={setDeletePercentage}
            />
          )}
          <form className="text-main mt-4 d-flex flex-column p-2 z--1">
            {/* Finding Students */}
            {findByNameTrue && (
              <StudentFindByName setFindByNameTrue={setFindByNameTrue} />
            )}
            {findByIdTrue && <StudentFindById />}
            {findStudentTrue && <StudentFinder />}

            {/* Delete a student by ID */}
            {deleteByIdTrue && <DeleteByID />}

            {/* Update a student by ID */}
            {updateByIdTrue && (
              <UpdateByID
                current_Id={current_Id}
                current_Marks1={current_Marks1}
                current_Marks2={current_Marks2}
                current_Marks3={current_Marks3}
                current_Marks4={current_Marks4}
                current_Name={current_Name}
                current_Total={current_Total}
                current_Percentage={current_Percentage}
              />
            )}

            {/* Create a student */}
            {createStudentTrue && <CreateStudent />}

            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
