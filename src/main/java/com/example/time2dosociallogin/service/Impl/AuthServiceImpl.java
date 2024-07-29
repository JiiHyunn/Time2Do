package com.example.time2dosociallogin.service.Impl;

import com.example.time2dosociallogin.entity.Users;
import com.example.time2dosociallogin.dto.ResponseDto;
import com.example.time2dosociallogin.jwt.JwtTokenProvider;
import com.example.time2dosociallogin.repository.UserRepository;
import com.example.time2dosociallogin.service.AuthService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Map;


@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;

    private final JwtTokenProvider jwtTokenProvider;

    @Value("${kakao.client.id}")
    private String clientKey;
    @Value("${kakao.redirect.url}")
    private String redirectUrl;
    @Value("${kakao.accesstoken.url}")
    private String kakaoAccessTokenUrl;
    @Value("${kakao.userinfo.url}")
    private String kakaoUserInfoUrl;


    @Override
    @Transactional
    public ResponseEntity<?> getKaKaoUserInfo(String code) {
        log.info("[kakao login] issue a authorizecode");

        ObjectMapper objectMapper = new ObjectMapper(); // json 파싱해주는 객체
        RestTemplate restTemplate = new RestTemplate(); // client 연결 객체

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        //Http Response Body 객체 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code"); //카카오 공식 문서 기준 authorization_code로 고정
        params.add("client_id", clientKey);             //client 키
        params.add("redirect_uri", redirectUrl);        //redirect uri
//        params.add("code", authorizeCode);
        params.add("code", code);                       //프론트에서 인가 코드 요청시 받은 인가 코드값

        //헤더와 바디 합치기 위해 Http Entity 객체 생성
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);


        //카카오로부터 Access token 받아오기
        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    kakaoAccessTokenUrl,
                    HttpMethod.POST,
                    kakaoTokenRequest,
                    String.class
            );
            log.info("[kakao login] authorizecode issued successfully");
            Map<String, Object> responseMap = objectMapper.readValue(response.getBody(), new TypeReference<Map<String, Object>>() {
            });
            String accessToken = (String) responseMap.get("access_token");

            return ResponseEntity.ok(getInfo(accessToken));

//            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//            KakaoTokenDto kakaoTokenDto = null;
//            try {
//                kakaoTokenDto = objectMapper.readValue(accessTokenResponse.getBody(), KakaoTokenDto.class);
//            } catch (JsonProcessingException e) {
//                e.printStackTrace();
//            }
//            return kakaoTokenDto;

        } catch (Exception e) {
            log.error("Error during Kakao login process", e);
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//            e.printStackTrace();
//            return null;
        }
    }


    @Transactional
    private ResponseDto getInfo(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        ObjectMapper mapper = new ObjectMapper();

        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");


        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();

        HttpEntity<?> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(kakaoUserInfoUrl, entity, String.class);

        try {
            Map<String, Object> responseMap = mapper.readValue(response.getBody(), new TypeReference<Map<String, Object>>() {
            });
            Map<String, Object> kakaoAccount = (Map<String, Object>) responseMap.get("kakao_account");
            Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

            ResponseDto responseSignUpDto = ResponseDto.builder()
                    .userName((String) kakaoAccount.get("name"))
                    .email((String) kakaoAccount.get("email"))
                    .profileUrl((String) profile.get("profile_image_url"))
                    .build();

            // 사용자 정보가 존재하는지 확인
            Users existingUser = userRepository.getByEmail(responseSignUpDto.getEmail());

            Users users;
            if (existingUser == null) {
                // 신규 사용자 생성
                users = new Users();
                users.setName(responseSignUpDto.getUserName());
                users.setEmail(responseSignUpDto.getEmail());
                users.setProfile_image_url(responseSignUpDto.getProfileUrl());
                userRepository.save(users);
            } else {
                // 기존 사용자 정보 업데이트
                users = existingUser;
                users.setName(responseSignUpDto.getUserName());
                users.setProfile_image_url(responseSignUpDto.getProfileUrl());
                userRepository.save(users);
            }

            String jwtToken = jwtTokenProvider.createToken(users.getEmail(), Collections.singletonList("ROLE_USER"));
            responseSignUpDto.setToken(jwtToken);

            return responseSignUpDto;

        } catch (HttpClientErrorException e) {
            log.error("Error occurred while fetching Kakao user info: " + e.getMessage());
            throw new RuntimeException("Failed to fetch user info from Kakao API", e);

        } catch (Exception e) {
            log.error("General error occurred: " + e.getMessage());
            throw new RuntimeException("An error occurred while processing the user info", e);
//            e.printStackTrace();
//            return null;
        }


    }
}
