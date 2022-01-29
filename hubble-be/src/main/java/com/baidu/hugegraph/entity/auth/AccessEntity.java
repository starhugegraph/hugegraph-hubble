package com.baidu.hugegraph.entity.auth;

import java.util.Set;

import com.baidu.hugegraph.structure.auth.HugePermission;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccessEntity {

    @JsonProperty("target_id")
    private String targetId;

    @JsonProperty("target_name")
    private String targetName;

    @JsonProperty("group_id")
    private String groupId;

    @JsonProperty("group_name")
    private String groupName;

    @JsonProperty("graphspace")
    private String graphSpace;

    @JsonProperty("graph")
    private String graph;

    @JsonProperty("permissions")
    private Set<HugePermission> permissions;

    public void addPermission(HugePermission p) {
        permissions.add(p);
    }
}
