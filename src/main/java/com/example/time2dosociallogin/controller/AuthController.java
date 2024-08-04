package com.example.time2dosociallogin.controller;


import com.example.time2dosociallogin.dto.ResponseDto;
import com.example.time2dosociallogin.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthService authService;

    @Value("${kakao.client.id}")
    private String clientId;

    @CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
    @GetMapping("/kakao/callback")

    public ResponseEntity<?> getKaKaoAuthorizeCode(@RequestParam("code") String authorizeCode) {

        log.info("[kakao-login] authorizeCode : {}", authorizeCode);


        try {
            ResponseEntity<?> responseDto = authService.getKaKaoUserInfo(authorizeCode);
            return ResponseEntity.ok(responseDto);
        } catch (Exception e) {
            log.error("Error during Kakao login process", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<String> handleMissingParams(MissingServletRequestParameterException ex) {
        String name = ex.getParameterName();
        log.error("Missing request parameter: {}", name);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Required request parameter '" + name + "' is missing");
    }

}