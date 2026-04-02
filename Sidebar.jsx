import { Link, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaPlus, FaSignOutAlt } from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#1e1e2f",
        color: "white",
        position: "fixed",
        padding: "20px"
      }}
    >
      <h4 className="mb-4">Student System</h4>

      <Link to="/dashboard" className="d-block text-white mb-3">
        <FaTachometerAlt /> Dashboard
      </Link>

      <Link to="/students" className="d-block text-white mb-3">
        <FaUsers /> Students
      </Link>

      <button className="btn btn-danger mt-4 w-100" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}

export default Sidebar;