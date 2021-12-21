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

    @JsonProperty("group_id")
    private String groupId;

    @JsonProperty("group_name")
    private String groupName;
}
