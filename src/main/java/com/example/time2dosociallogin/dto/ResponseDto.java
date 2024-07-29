package com.example.time2dosociallogin.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ResponseDto {
    private String userName;
    private String email;
    private String profileUrl;
    private String token;

}
