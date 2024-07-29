package com.example.time2dosociallogin.dao;

import com.example.time2dosociallogin.entity.Users;

public interface UserDao {
    Users insertUser(Users users);

    Users getUser(String email);
}
