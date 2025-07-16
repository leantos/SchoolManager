import { useEffect, useState } from "react";
import StudentTable from "../table_stuff/StudentTable";

const ShowAllStudents = ({
  setShowAllStudentsTrue,
  setUpdateByIdTrue,
  setCurrent_Id,
  setCurrent_Name,
  setCurrent_Marks1,
  setCurrent_Marks2,
  setCurrent_Marks3,
  setCurrent_Marks4,
  setCurrent_Total,
  setCurrent_Percentage,
}) => {
  const [students, setStudents] = useState([]);
  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
  const limit = 5;

  //fetching logic
  const fetchAllStudents = async (page) => {
    const offset = (page - 1) * limit;
    try {
      const res = await fetch(`/Student?limit=${limit}&offset=${offset}`);
      const text = await res.text();
      const data = text ? JSON.parse(text) : { students: [], totalStudents: 0 };
      setStudents(data.students);
      setTotalStudents(data.totalCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllStudents(currentPage);
  }, [currentPage]);

  return (
    <>
      <StudentTable
        students={students}
        setStudents = {setStudents}
        //refresh page on delete
        fetchAllStudents = {fetchAllStudents}
        //pagination stuff
        paginationNeeded={true}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        limit={limit}
        totalStudents={totalStudents}
        //boolean handlers
        setShowAllStudentsTrue={setShowAllStudentsTrue}
        setUpdateByIdTrue={setUpdateByIdTrue}
        setCurrent_Id={setCurrent_Id}
        setCurrent_Name={setCurrent_Name}
        setCurrent_Marks1={setCurrent_Marks1}
        setCurrent_Marks2={setCurrent_Marks2}
        setCurrent_Marks3={setCurrent_Marks3}
        setCurrent_Marks4={setCurrent_Marks4}
        setCurrent_Total={setCurrent_Total}
        setCurrent_Percentage={setCurrent_Percentage}
      />
    </>
  );
};

export default ShowAllStudents;
