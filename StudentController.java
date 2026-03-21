package com.example.stdm_system.controller;

import com.example.stdm_system.model.Student;
import com.example.stdm_system.service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // 🔹 Add Student
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    // 🔹 Get All Students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // 🔹 Get Student By ID
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    // 🔹 Update Student
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    // 🔹 Delete Student
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return "Student deleted successfully";
    }

    // 🔐 Login API
    @PostMapping("/login")
    public String login(@RequestBody Student student) {

        Student validStudent = studentService.login(
                student.getUsername(),
                student.getPassword()
        );

        if (validStudent != null) {
            return "Login Successful";
        } else {
            return "Invalid Username or Password";
        }
    }
}