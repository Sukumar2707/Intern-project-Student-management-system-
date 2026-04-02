import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";

function App() {
  const location = useLocation();
  const user = localStorage.getItem("user");

  // 🔹 Hide sidebar & header on login & signup
  const hideLayout = ["/", "/signup"].includes(location.pathname);

  return (
    <>
      {user && !hideLayout && <Sidebar />}

      <div
        style={{
          marginLeft: user && !hideLayout ? "220px" : "0px",
          minHeight: "100vh"
        }}
      >
        {user && !hideLayout && <Header />}

        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<StudentForm />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/students"
              element={
                <ProtectedRoute>
                  <StudentList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add"
              element={
                <ProtectedRoute>
                  <StudentForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <StudentForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;