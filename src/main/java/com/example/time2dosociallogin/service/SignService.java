package com.example.time2dosociallogin.service;

import com.example.time2dosociallogin.dto.SignDto.SignInResultDto;
import com.example.time2dosociallogin.dto.SignDto.SignUpDto;
import com.example.time2dosociallogin.dto.SignDto.SignUpResultDto;

public interface SignService {
    SignUpResultDto SignUp(SignUpDto signUpDto, String role);
    SignInResultDto SignIn(String email);
}
