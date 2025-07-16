const SideBar = ({
  createStudentTrue,
  setCreateStudentTrue,
  showAllStudentsTrue,
  setShowAllStudentsTrue,
  findStudentTrue,
  findByIdTrue,
  findByNameTrue,
  setFindByIdTrue,
  setFindByNameTrue,
  setFindStudentTrue,
  updateByIdTrue,
  setUpdateByIdTrue,
  deleteByIdTrue,
  setDeleteByIdTrue,
}) => {
  const handleFindStudentClick = (e) => {
    e.preventDefault();
    setFindStudentTrue((prev) => !prev);
    setFindByNameTrue(false);
    setFindByIdTrue(false);
    setCreateStudentTrue(false);
    setDeleteByIdTrue(false);
    setUpdateByIdTrue(false);
    setShowAllStudentsTrue(false);
  };

  const handleCreateStudentTrueClick = (e) => {
    e.preventDefault();
    setCreateStudentTrue((prev) => !prev);
    setFindByIdTrue(false);
    setFindByNameTrue(false);
    setDeleteByIdTrue(false);
    setUpdateByIdTrue(false);
    setShowAllStudentsTrue(false);
    setFindStudentTrue(false);
  };

  const handleUpdateByIdTrueClick = (e) => {
    e.preventDefault();
    setUpdateByIdTrue((prev) => !prev);
    setFindByIdTrue(false);
    setCreateStudentTrue(false);
    setFindByNameTrue(false);
    setDeleteByIdTrue(false);
    setShowAllStudentsTrue(false);
    setFindStudentTrue(false);
  };

  const handleDeleteByIdTrue = (e) => {
    e.preventDefault();
    setDeleteByIdTrue((prev) => !prev);
    setFindByIdTrue(false);
    setCreateStudentTrue(false);
    setFindByNameTrue(false);
    setUpdateByIdTrue(false);
    setShowAllStudentsTrue(false);
    setFindStudentTrue(false);
  };
  const handleShowAllStudentsClick = (e) => {
    e.preventDefault();
    setShowAllStudentsTrue((prev) => !prev);
    setFindByIdTrue(false);
    setCreateStudentTrue(false);
    setFindByNameTrue(false);
    setDeleteByIdTrue(false);
    setUpdateByIdTrue(false);
    setFindStudentTrue(false);
  };

  return (
    <div
      className="position-fixed h-100 bg-secondary-subtle d-flex flex-column pt-3"
      style={{ marginTop: "68px", width: "18rem" }}
    >
      <div className="btn-group-vertical w-100">
        <button
          className={
            showAllStudentsTrue
              ? "btn btn-light rounded-0 w-100"
              : "btn btn-secondary rounded-0 w-100"
          }
          onClick={handleShowAllStudentsClick}
        >
          Show All Students
        </button>
        <button
          className={
            createStudentTrue
              ? "btn btn-light rounded-0 w-100"
              : "btn btn-secondary rounded-0 w-100"
          }
          onClick={handleCreateStudentTrueClick}
        >
          Create a new Student
        </button>
        <div className="button-group d-flex w-100 position-relative">
          <button
            className={
              findStudentTrue
                ? "btn btn-light rounded-0 w-100"
                : "btn btn-secondary rounded-0 w-100"
            }
            onClick={handleFindStudentClick}
          >
            Find Students
          </button>
        </div>
        <button
          className={
            deleteByIdTrue
              ? "btn btn-light rounded-0 w-100"
              : "btn btn-secondary rounded-0 w-100"
          }
          onClick={handleDeleteByIdTrue}
        >
          Delete a Student by ID
        </button>
        <button
          className={
            updateByIdTrue
              ? "btn btn-light rounded-0 w-100"
              : "btn btn-secondary rounded-0 w-100"
          }
          onClick={handleUpdateByIdTrueClick}
        >
          Update a Student by ID
        </button>
      </div>
    </div>
  );
};

export default SideBar;
