package com.example.stdm_system.repository;

import com.example.stdm_system.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    // 🔐 Login method
    Student findByUsernameAndPassword(String username, String password);
}