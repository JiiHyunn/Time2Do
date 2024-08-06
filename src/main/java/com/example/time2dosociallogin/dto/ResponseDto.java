package com.example.time2dosociallogin.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ResponseDto {
    private String userNickName;
    private String email;
    private String profileUrl;
    private String token;

}
