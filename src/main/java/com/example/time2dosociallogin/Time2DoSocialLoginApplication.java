package com.example.time2dosociallogin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class Time2DoSocialLoginApplication {

    public static void main(String[] args) {
        SpringApplication.run(Time2DoSocialLoginApplication.class, args);
    }

}
