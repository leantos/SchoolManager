import { useState } from "react";

const DeleteByID = () => {
  const [id, setId] = useState(0);
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState("");

  const idInput = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/Student?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });
      res.ok
        ? setMessage("Deleted Successfully")
        : setMessage("Couldn't Delete");
      res.ok ? setSuccess(true) : setSuccess(false);
    } catch (error) {
      setSuccess(false);
      setMessage("Error ", error);
    }
  };

  return (
    <div>
      <label className="form-label">Delete by ID</label>
      {success !== null && (
        <div
          className={
            success ? "alert alert-success py-1" : "alert alert-danger py-1"
          }
        >
          {message}
        </div>
      )}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter the ID to Delete Student Record"
          onChange={(e) => setId(Number(e.target.value))}
        ></input>
        <button className="btn btn-primary" onClick={idInput}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteByID;
