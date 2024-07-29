package com.example.time2dosociallogin.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final UserDetailsService userDetailsService;

    private final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${springboot.jwt.secret}")
    private String secretKey;

    private final long tokenValidMillisecond = 1000L * 60 * 60; // 1시간 토큰 유효

    @PostConstruct
    protected void init() {
        logger.info("[init] JwtTokenProvider 내 secret Key 초기화 시작");
        logger.info("Secret Key: {}", secretKey);
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes(StandardCharsets.UTF_8));
        logger.info("Encoded Secret Key: {}", secretKey);
        logger.info("[init] JwtTokenProvider 내 secret Key 초기화 완료");
    }

    // jwt 토큰 생성
    public String createToken(String email, List<String> role) {
        // uid를 이용하여 jwt 생성
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("role", role);

        Date now = new Date();
        Date validity = new Date(now.getTime() + tokenValidMillisecond);

        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
        logger.info("[createToken] 토큰 생성 완료");
        return token;
    }

    // jwt 토큰으로 인증 정보 조회
    public Authentication getAuthentication(String token) {
        logger.info("[getAuthentication] 토큰 인증 정보 조회 시작");
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUsername(token));
        logger.info("[getAuthentication] 토큰 인증 정보 조회 완료, UserDetails userName: {}", userDetails.getUsername());
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // jwt 토큰에서 회원 구별 정보 추출
    public String getUsername(String token) {
        logger.info("[getUsername] 토큰에서 회원 구별 정보 추출");
        String info = Jwts.parser()
                .setSigningKey(secretKey) // 시크릿 키로 jwt 검증
                .parseClaimsJws(token) // 토큰 파싱하고 내용 추출
                .getBody() // 토큰 본문 가져오기(payload)
                .getSubject(); // 클레임에서 "sub" (subject) 필드를 가져와서 회원의 구별 정보를 추출
        logger.info("[getUsername] 토큰 기반 회원 구별 정보 추출 완료, info: {}", info);
        return info;
    }

    // jwt 토큰의 유효성 + 만료일 체크
    public String resolveToken(HttpServletRequest request) {
        logger.info("[resolveToken] HTTP 헤더에서 Token 값 추출");
        return request.getHeader("X-AUTH-TOKEN");
    }

    public boolean validationToken(String token) {
        logger.info("[validateToken] 토큰 유효 체크 시작");
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token);
            logger.info("[validateToken] 토큰 유효 체크 완료");
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            logger.info("[validateToken] 토큰 유효 체크 예외 발생");
            return false;
        }
    }


    public long getTokenValidMillisecond() {
        return tokenValidMillisecond;
    }
}
