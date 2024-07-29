package com.example.time2dosociallogin.service.Impl;

import com.example.time2dosociallogin.dto.CommonResponse;
import com.example.time2dosociallogin.dto.SignDto.SignInResultDto;
import com.example.time2dosociallogin.dto.SignDto.SignUpDto;
import com.example.time2dosociallogin.dto.SignDto.SignUpResultDto;
import com.example.time2dosociallogin.entity.Users;
import com.example.time2dosociallogin.jwt.JwtTokenProvider;
import com.example.time2dosociallogin.repository.UserRepository;
import com.example.time2dosociallogin.service.SignService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;

@RequiredArgsConstructor
@Service
public class SignServiceImpl implements SignService {
    private Logger logger = LoggerFactory.getLogger(SignServiceImpl.class);
    private JwtTokenProvider jwtProvider;
    private final UserRepository userRepository;

    @Autowired
    public SignServiceImpl(UserRepository userRepository, JwtTokenProvider jwtProvider) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public SignUpResultDto SignUp(SignUpDto signUpDto, String role) {

        if (userRepository.existsByEmail(signUpDto.getEmail())) {
            throw new IllegalStateException("이미 존재하는 이메일입니다: " + signUpDto.getEmail());
        }

        Users users;
        if (role.equalsIgnoreCase("admin")) {
            users = Users.builder()
                    .email(signUpDto.getEmail())
                    .name(signUpDto.getName())
                    .role(Collections.singletonList("ROLE_ADMIN"))
                    .build();
        } else {
            users = Users.builder()
                    .email(signUpDto.getEmail())
                    .name(signUpDto.getName())
                    .role(Collections.singletonList("ROLE_USER"))
                    .build();
        }

        Users savedUser = userRepository.save(users);

        SignUpResultDto signUpResultDto = new SignUpResultDto();
        logger.info("[getSignResultDto user 정보 들어왔는지 확인 후 결과값 주입");

        if (!savedUser.getEmail().isEmpty()) {
            setSuccess(signUpResultDto);
        } else {
            setFail(signUpResultDto);
        }

        return signUpResultDto;
    }

    @Override
    public SignInResultDto SignIn(String email) throws RuntimeException {
        Users users = userRepository.getByEmail(email);

        if (users == null) {
            throw new RuntimeException("사용자를 찾을 수 없습니다.");
        }

        logger.info("[getSignInResult] 사용자 이메일 확인 완료");

        logger.info("[getSignInResult] SignInResultDto 객체 생성");
        SignInResultDto signInResultDto = SignInResultDto.builder()
                .token(jwtProvider.createToken(String.valueOf(users.getEmail()), users.getRole()))
                .build();
        logger.info("[getSingInResult] SignInResultDto 객체에 값 주입");
        setSuccess(signInResultDto);
        return signInResultDto;
    }

    private void setSuccess(SignUpResultDto result) {
        result.setSuccess(true);
        result.setCode(CommonResponse.SUCCESS.getCode());
        result.setMsg(CommonResponse.SUCCESS.getMsg());
    }

    private void setFail(SignUpResultDto result) {
        result.setSuccess(false);
        result.setCode(CommonResponse.Fail.getCode());
        result.setMsg(CommonResponse.Fail.getMsg());
    }

    private void setSuccess(SignInResultDto result) {
        result.setSuccess(true);
        result.setCode(CommonResponse.SUCCESS.getCode());
        result.setMsg(CommonResponse.SUCCESS.getMsg());
    }

    private void setFail(SignInResultDto result) {
        result.setSuccess(false);
        result.setCode(CommonResponse.Fail.getCode());
        result.setMsg(CommonResponse.Fail.getMsg());
    }
}
