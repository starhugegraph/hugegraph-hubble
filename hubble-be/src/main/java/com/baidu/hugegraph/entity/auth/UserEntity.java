package com.baidu.hugegraph.entity.auth;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.baidu.hugegraph.common.Identifiable;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity implements Identifiable {

    @JsonProperty("id")
    private String id;

    @JsonProperty("user_name")
    private String name;

    @JsonProperty("user_email")
    private String email;

    @JsonProperty("user_password")
    private String password;

    @JsonProperty("user_phone")
    private String phone;

    @JsonProperty("user_avatar")
    private String avatar;

    @JsonProperty("user_description")
    private String description;

    @JsonProperty("user_create")
    protected Date create;
    @JsonProperty("user_update")
    protected Date update;
    @JsonProperty("user_creator")
    protected String creator;

    @JsonProperty("is_superadmin")
    private boolean isSuperadmin;
}


