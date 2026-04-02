import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import API from "../services/api";
import Swal from "sweetalert2";

function StudentForm() {
  const [student, setStudent] = useState({
    name: "",
    course: "",
    department: "",
    username: "",
    password: ""
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const loadStudent = async () => {
      if (id) {
        const res = await API.get(`/students/${id}`);
        setStudent(res.data);
      }
    };
    loadStudent();
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !student.name ||
      !student.course ||
      !student.department ||
      !student.username ||
      !student.password
    ) {
      Swal.fire("Warning", "All fields are required", "warning");
      return;
    }

    if (student.password !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }

    try {
      if (id) {
        await API.put(`/students/${id}`, student);

        Swal.fire("Success", "Student Updated Successfully", "success");
        navigate("/students");
      } else {
        await API.post("/students", student);

        if (location.pathname === "/signup") {
          Swal.fire("Success", "Account Created Successfully", "success");
          navigate("/");
        } else {
          Swal.fire("Success", "Student Added Successfully", "success");
          navigate("/students");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <div className="card shadow p-4" style={{ maxWidth: "500px", margin: "auto" }}>
        <h3 className="text-center mb-3">
          {id ? "Update Student" : location.pathname === "/signup" ? "Sign Up" : "Add Student"}
        </h3>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" className="form-control mb-3"
            value={student.name} onChange={handleChange} />

          <input name="course" placeholder="Course" className="form-control mb-3"
            value={student.course} onChange={handleChange} />

          <input name="department" placeholder="Department" className="form-control mb-3"
            value={student.department} onChange={handleChange} />

          <input name="username" placeholder="Username" className="form-control mb-3"
            value={student.username} onChange={handleChange} />

          <input type="password" name="password" placeholder="Password"
            className="form-control mb-3"
            value={student.password} onChange={handleChange} />

          <input type="password" placeholder="Confirm Password"
            className="form-control mb-3"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} />

          <button className="btn btn-success w-100">
            {id ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;