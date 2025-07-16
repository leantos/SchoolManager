import { useState } from "react";
import { ThreeDot } from "react-loading-indicators";

const StudentTable = ({
  //fetch table on delete
  students,
  setStudents,
  fetchAllStudents,
  //pagination input
  currentPage,
  setCurrentPage,
  limit,
  totalStudents,
  paginationNeeded,
  //boolean handlers
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
  const [success, setSuccess] = useState(null);
  const [isSearchMode, setIsSearchMode] = useState(null);
  const [message, setMessage] = useState("");
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [marks1, setMarks1] = useState(null);
  // const [marks2, setMarks2] = useState(null);
  // const [marks3, setMarks3] = useState(null);
  // const [marks4, setMarks4] = useState(null);
  // const [total, setTotal] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [toastVisibility, setToastVisibility] = useState(false);
  const [findCurrentPage, setFindCurrentPage] = useState(1);
  const [findTotalStudents, setFindTotalStudents] = useState(0);
  const marks1 = null,
    marks2 = null,
    marks3 = null,
    marks4 = null,
    total = null;

  //pagination handlers

  // pagination handlers
  const handleNext = () => {
    const nextPage = isSearchMode ? findCurrentPage + 1 : currentPage + 1;
    handlePageClick(nextPage);
  };

  const handlePrevious = () => {
    const prevPage = isSearchMode ? findCurrentPage - 1 : currentPage - 1;
    handlePageClick(prevPage);
  };

  const totalPages = Math.ceil(
    isSearchMode ? findTotalStudents / limit : totalStudents / limit
  );
  const currentPageUsed = isSearchMode ? findCurrentPage : currentPage;
  const isFirstPage = currentPageUsed === 1;
  const isLastPage = currentPageUsed === totalPages;

  //deletion handler
  const deleteStudent = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(`/Student?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });
      setLoading(false);
      if (res.ok) {
        setMessage("Deleted Successfully");
        fetchAllStudents(1);
      } else {
        setMessage("Couldn't Delete");
      }
      res.ok ? setSuccess(true) : setSuccess(false);
    } catch (error) {
      setSuccess(false);
      setMessage("Error ", error);
    }
  };

  //findByNameHandler

  const handleFindStudent = async (e) => {
    e.preventDefault();
    setIsSearchMode(true);
    setFindCurrentPage(1); // reset search page to 1

    const p1 = parseInt(marks1),
      p2 = parseInt(marks2),
      p3 = parseInt(marks3),
      p4 = parseInt(marks4),
      queryTotal = parseInt(total),
      queryPercentage = parseFloat(percentage);

    const offset = 0;

    const query = {
      id,
      name,
      marks1: isNaN(p1) ? null : p1,
      marks2: isNaN(p2) ? null : p2,
      marks3: isNaN(p3) ? null : p3,
      marks4: isNaN(p4) ? null : p4,
      total: queryTotal,
      percentage: queryPercentage,
    };
    console.log(query);

    try {
      const res = await fetch(
        `/Student/search?limit=${limit}&offset=${offset}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(query),
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.results && Array.isArray(data.results)) {
        setStudents(data.results);
        setFindTotalStudents(data.count || 0);
        setSuccess(true);
        setMessage(`Found ${data.count} Students`);
      } else {
        setStudents([]);
        setFindTotalStudents(0);
        setSuccess(false);
        setMessage("No matching students found");
      }
    } catch (err) {
      setSuccess(false);
      setMessage("Search failed");
      console.error(err);
    }
  };

  // when pagination buttons are clicked:
  const handlePageClick = async (pageNum) => {
    if (isSearchMode) {
      setFindCurrentPage(pageNum);

      const offset = (pageNum - 1) * limit;

      const query = {
        id,
        name,
        marks1,
        marks2,
        marks3,
        marks4,
        total,
        percentage,
      };
      try {
        const res = await fetch(
          `/Student/search?limit=${limit}&offset=${offset}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(query),
          }
        );
        const data = await res.json();
        console.log(data);
        setStudents(data.results || []);
        setFindTotalStudents(data.count || 0);
      } catch (err) {
        setSuccess(false);
        setMessage("Error while paging through search results");
      }
    } else {
      setCurrentPage(pageNum);
      fetchAllStudents(pageNum);
    }
  };

  return (
    <div>
      {!loading && paginationNeeded && (
        <table className="table table-hover bg-light mb-0">
          <thead className="table-striped">
            <tr className="position-relative">
              <th colSpan={8}>
                Total: {isSearchMode ? findTotalStudents : totalStudents}{" "}
                Students
              </th>
              <th colSpan={9}>
                <nav aria-label="Student table pagination">
                  <ul className="pagination pagination-sm justify-content-end mb-0">
                    <li className="page-item">
                      <button
                        disabled={isFirstPage}
                        className="page-link"
                        onClick={() => {
                          handlePrevious();
                          setSuccess(null);
                        }}
                      >
                        Previous
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                      <li
                        className={
                          currentPageUsed === i + 1
                            ? "page-item active"
                            : "page-item"
                        }
                        key={i}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageClick(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className="page-item">
                      <button
                        disabled={isLastPage}
                        className="page-link"
                        onClick={() => {
                          handleNext();
                          setSuccess(null);
                        }}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </th>
            </tr>
          </thead>
        </table>
      )}
      <table className="table table-hover bg-light shadow">
        <tbody className="table-group-divider">
          <tr>
            <td colSpan={10}>
              <input
                type="text"
                className="form-control mb-2"
                onChange={(e) => setName(e.target.value)}
                placeholder="You can also enter part of their name to find them"
              ></input>
              <input
                type="number"
                className="form-control"
                onChange={(e) => setPercentage(e.target.value)}
                placeholder="You can also enter their percentage to find them"
              ></input>
              <button
                className="btn btn-primary py-1 w-100 mt-2"
                onClick={handleFindStudent}
              >
                Find
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {success !== null && (
        <p
          className={
            success
              ? "alert alert-success p-1 text-center"
              : "alert alert-danger p-1 text-center"
          }
        >
          {message}
        </p>
      )}
      {loading && (
        <div className="text-center my-2">
          <ThreeDot
            variant="bounce"
            color="#a73b3b"
            size="medium"
            text="Fetching Students"
            textColor="black"
          />
        </div>
      )}
      <table className="table table-striped table-hover bg-light shadow">
        <thead className="table-hover">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Math</th>
            <th>Science</th>
            <th>English</th>
            <th>History</th>
            <th>Total</th>
            <th>Percentage</th>
            <th colSpan={2} className="text-end fw-normal">
              Page {currentPageUsed} out of {totalPages}
            </th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.marks1}</td>
                <td>{student.marks2}</td>
                <td>{student.marks3}</td>
                <td>{student.marks4}</td>
                <td>{student.totalMarks}</td>
                <td>{student.percentage}%</td>
                <td>
                  <button
                    className="btn btn-outline-primary w-auto m-0 px-3 py-0"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowAllStudentsTrue((prev) => !prev);
                      setUpdateByIdTrue((prev) => !prev);
                      setCurrent_Id(student.id);
                      setCurrent_Name(student.name);
                      setCurrent_Marks1(student.marks1);
                      setCurrent_Marks2(student.marks2);
                      setCurrent_Marks3(student.marks3);
                      setCurrent_Marks4(student.marks4);
                      setCurrent_Total(student.totalMarks);
                      setCurrent_Percentage(student.percentage);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger w-auto m-0 px-3 py-0"
                    onClick={(e) => {
                      e.preventDefault();
                      setId(student.id);
                      setName(student.name);
                      setToastVisibility((prev) => !prev);
                      setSuccess(null);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {toastVisibility && (
        <div className="position-fixed bg-dark bg-opacity-50 top-0 end-0 p-3 m-4 z-3 rounded-3 shadow border">
          <div className="text-white d-flex align-items-center">
            Do you want to delete student {name}?
            <button
              className="btn btn-outline-secondary ms-2 py-0 px-1"
              onClick={(e) => {
                e.preventDefault();
                setToastVisibility((prev) => !prev);
              }}
            >
              <i className="bi bi-x fs-6" />
            </button>
          </div>
          <div>
            <button
              className="btn btn-danger px-3 py-0 mt-2"
              onClick={(e) => {
                deleteStudent(e);
              }}
            >
              Delete
            </button>
            <button
              className="btn btn-secondary px-3 py-0 mx-2 mt-2"
              onClick={(e) => {
                e.preventDefault();
                setToastVisibility((prev) => !prev);
              }}
            >
              No
            </button>
          </div>
          {success !== null && (
            <div
              className={
                success
                  ? "bg-success text-white fw-semibold bg-opacity-50 p-1 my-2 rounded shadow"
                  : "bg-danger text-white fw-semibold bg-opacity-50 p-1 my-2 rounded shadow"
              }
            >
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentTable;
