import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

function StudentList() {
  
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const res = await API.get("/students");
      setStudents(res.data);
    };

    loadData();
  }, []);

  const deleteStudent = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        await API.delete(`/students/${id}`);

        const res = await API.get("/students");
        setStudents(res.data);

        Swal.fire("Deleted!", "Student has been deleted.", "success");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">Students</h2>

      <button
        className="btn btn-success mb-3"
        onClick={() => navigate("/add")}
      >
        + Add Student
      </button>

      <div className="card shadow p-3">
        <table className="table premium-table mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Course</th>
              <th>Department</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.course}</td>
                <td>{s.department}</td>

                <td className="text-center">
                  <button
                    className="btn btn-primary action-btn me-2"
                    onClick={() => navigate(`/edit/${s.id}`)}
                  >
                     Edit
                  </button>

                  <button
                    className="btn btn-danger action-btn"
                    onClick={() => deleteStudent(s.id)}
                  >
                     Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;