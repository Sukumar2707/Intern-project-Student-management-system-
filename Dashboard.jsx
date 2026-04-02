import { useEffect, useState } from "react";
import API from "../services/api";
import { FaUserGraduate, FaBook, FaBuilding } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from "recharts";

function Dashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await API.get("/students");
      setStudents(res.data);
    };

    loadData();
  }, []);

  const totalStudents = students.length;
  const courses = [...new Set(students.map((s) => s.course))];
  const departments = [...new Set(students.map((s) => s.department))];

  const courseData = Object.values(
    students.reduce((acc, s) => {
      acc[s.course] = acc[s.course] || { name: s.course, value: 0 };
      acc[s.course].value++;
      return acc;
    }, {})
  );

  const COLORS = ["#007bff", "#28a745", "#fd7e14", "#6f42c1", "#dc3545"];

  const recentStudents = students.slice(-5).reverse();

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Dashboard</h2>

      {/* 🔥 Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center shadow-sm p-3 border hover-card">
            <h6 className="text-muted">Total Students</h6>
            <h2>{totalStudents}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm p-3 border hover-card">
            <h6 className="text-muted">Courses</h6>
            <h2>{courses.length}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm p-3 border hover-card">
            <h6 className="text-muted">Departments</h6>
            <h2>{departments.length}</h2>
          </div>
        </div>
      </div>

      {/* 📊 Chart */}
      <div className="card shadow-sm p-4 mb-4 hover-card">
        <h5 className="text-center mb-3">Students by Course</h5>

        <div className="d-flex justify-content-center">
          <BarChart width={600} height={300} data={courseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="value" radius={[10, 10, 0, 0]}>
              {courseData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </div>
      </div>

      {/* 📋 Recent Students */}
      <div className="card shadow-sm p-4 hover-card">
        <h5 className="mb-3">Recent Students</h5>

        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Course</th>
              <th>Department</th>
            </tr>
          </thead>

          <tbody>
            {recentStudents.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.course}</td>
                <td>{s.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;