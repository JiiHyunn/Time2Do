package com.example.time2dosociallogin.dao.Impl;

import com.example.time2dosociallogin.entity.Users;
import com.example.time2dosociallogin.dao.UserDao;
import com.example.time2dosociallogin.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserDaoImpl implements UserDao {
    private final UserRepository userRepository;

    @Override
    public Users insertUser(Users users) {
        return userRepository.save(users);
    }

    @Override
    public Users getUser(String email) {
        return userRepository.getByEmail(email);
    }
}
