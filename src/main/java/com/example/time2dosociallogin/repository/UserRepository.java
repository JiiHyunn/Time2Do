package com.example.time2dosociallogin.repository;

import com.example.time2dosociallogin.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    Users getByEmail(String email);

    boolean existsByEmail(String email);

}
