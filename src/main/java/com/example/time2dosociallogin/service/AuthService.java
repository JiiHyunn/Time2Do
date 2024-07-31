package com.example.time2dosociallogin.service;

import com.example.time2dosociallogin.dto.ResponseDto;

public interface AuthService {
    ResponseDto getKaKaoUserInfo(String authorizeCode);

}
