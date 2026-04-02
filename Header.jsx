import { useState } from "react";
import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div
      style={{
        height: "60px",
        background: "#1e1e2f",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 20px",
        borderBottom: "1px solid #2c2c3e",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}
    >
      <button className="btn btn-dark me-3" onClick={toggleDarkMode}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      <div style={{ position: "relative" }}>
        <FaUserCircle
          size={30}
          style={{ cursor: "pointer" }}
          onClick={() => setShowDropdown(!showDropdown)}
        />

        {/* 🔽 Dropdown */}
        {showDropdown && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "40px",
              background: "#fff",
              color: "#000",
              borderRadius: "5px",
              width: "150px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                padding: "10px",
                borderBottom: "1px solid #ddd",
                fontWeight: "bold"
              }}
            >
              {user}
            </div>

            <div
                style={{
                    padding: "10px",
                    cursor: "pointer"
                }}
                onClick={() => {
                    setShowDropdown(false);
                    navigate("/profile");
                }}
                >
                View Profile
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;