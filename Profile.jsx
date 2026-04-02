import { useEffect, useState } from "react";
import API from "../services/api";
import Swal from "sweetalert2";

function Profile() {
  const [student, setStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const username = localStorage.getItem("user");

  useEffect(() => {
    const loadProfile = async () => {
      const res = await API.get(`/students/username/${username}`);
      setStudent(res.data);
    };
    loadProfile();
  }, [username]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    let updatedStudent = { ...student };

    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        Swal.fire("Error", "Passwords do not match", "error");
        return;
      }
      updatedStudent.password = newPassword;
    }

    await API.put(`/students/${student.id}`, updatedStudent);

    Swal.fire("Success", "Profile Updated Successfully", "success");

    setStudent(updatedStudent);
    setEditMode(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  if (!student) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <div className="card shadow p-4" style={{ maxWidth: "500px" }}>
        <h3>My Profile</h3>

        {!editMode ? (
          <>
            <p><b>Name:</b> {student.name}</p>
            <p><b>Course:</b> {student.course}</p>
            <p><b>Department:</b> {student.department}</p>

            <button className="btn btn-primary"
              onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <input name="name" value={student.name}
              className="form-control mb-2"
              onChange={handleChange} />

            <input name="course" value={student.course}
              className="form-control mb-2"
              onChange={handleChange} />

            <input name="department" value={student.department}
              className="form-control mb-2"
              onChange={handleChange} />

            <h6>Change Password</h6>

            <input type="password" placeholder="New Password"
              className="form-control mb-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)} />

            <input type="password" placeholder="Confirm Password"
              className="form-control mb-3"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} />

            <div className="mt-3">
              <button className="btn btn-success me-2" onClick={handleUpdate}>
                Save
              </button>

              <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;