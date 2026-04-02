package com.example.stdm_system.service;

import com.example.stdm_system.model.Student;
import com.example.stdm_system.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    public Student updateStudent(Long id, Student student) {
        Student existingStudent = studentRepository.findById(id).orElse(null);

        if (existingStudent != null) {
            existingStudent.setName(student.getName());
            existingStudent.setCourse(student.getCourse());
            existingStudent.setDepartment(student.getDepartment());
            existingStudent.setUsername(student.getUsername());
            existingStudent.setPassword(student.getPassword());

            return studentRepository.save(existingStudent);
        }

        return null;
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    public Student login(String username, String password) {
        return studentRepository.findByUsernameAndPassword(username, password);
    }
    public Student findByUsername(String username) {
        return studentRepository.findByUsername(username);
    }
}