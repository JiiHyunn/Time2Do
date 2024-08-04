package com.example.time2dosociallogin.service;

import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<?> getKaKaoUserInfo(String authorizeCode);

}
