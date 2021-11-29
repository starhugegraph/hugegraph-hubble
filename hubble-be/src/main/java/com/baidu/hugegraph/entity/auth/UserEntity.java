package com.baidu.hugegraph.entity.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.baidu.hugegraph.common.Identifiable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity implements Identifiable {

    @JsonProperty("id")
    private String id;

    @JsonProperty("user_name")
    private String name;
}
