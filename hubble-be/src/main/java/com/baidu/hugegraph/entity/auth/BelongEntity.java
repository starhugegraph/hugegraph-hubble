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
public class BelongEntity implements Identifiable {

    @JsonProperty("id")
    private String id;

    @JsonProperty("user_id")
    private String userId;

    @JsonProperty("user_name")
    private String userName;

    @JsonProperty("role_id")
    private String roleId;

    @JsonProperty("role_name")
    private String roleName;
}
