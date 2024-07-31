package com.example.time2dosociallogin.controller;


import com.example.time2dosociallogin.dto.ResponseDto;
import com.example.time2dosociallogin.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;


@RestController
@RequestMapping("")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthService authService;

    @Value("${kakao.client.id}")
    private String clientId;


//   @GetMapping("/kakao/callback")
//    public ResponseEntity<?> getKaKaoAuthorizeCode(@RequestParam(required = false, value = "code") String authorizeCode) {
//        log.info("[kakao-login] authorizeCode : {}", authorizeCode);
//
//       ResponseDto responseDto = authService.getKaKaoUserInfo(authorizeCode);
//       return ResponseEntity.ok(responseDto);
//
//        RestTemplate restTemplate = new RestTemplate();
//        HttpHeaders headers = new HttpHeaders();
//        headers.set("Authorization", "Bearer {토큰값}");
//
//        return authService.getKaKaoUserInfo(authorizeCode);
//    }

    @GetMapping("/kakao/callback")

    public ResponseEntity<?> getKaKaoAuthorizeCode(@RequestParam("code") String authorizeCode) {

        log.info("[kakao-login] authorizeCode : {}", authorizeCode);

        if (authorizeCode == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Authorization code is missing");
        }

        try {
            ResponseDto responseDto = authService.getKaKaoUserInfo(authorizeCode);
            return ResponseEntity.ok(responseDto);
        } catch (Exception e) {
            log.error("Error during Kakao login process", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


}