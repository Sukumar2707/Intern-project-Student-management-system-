package org.example.model;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {

    // 🔹 Primary Key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔹 Student Name
    @Column(nullable = false)
    private String name;

    // 🔹 Course
    @Column(nullable = false)
    private String course;

    // 🔹 Department
    @Column(nullable = false)
    private String department;

    // 🔐 Username (for login)
    @Column(unique = true, nullable = false)
    private String username;

    // 🔐 Password (for login)
    @Column(nullable = false)
    private String password;

    // 🔹 Default Constructor
    public Student() {
    }

    // 🔹 Parameterized Constructor
    public Student(String name, String course, String department, String username, String password) {
        this.name = name;
        this.course = course;
        this.department = department;
        this.username = username;
        this.password = password;
    }

    // 🔹 Getters and Setters

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}