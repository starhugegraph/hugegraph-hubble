package com.baidu.hugegraph.entity.auth;

import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserView {

    @JsonProperty("user_id")
    private String id;

    @JsonProperty("user_name")
    private String name;

    @JsonProperty("groups")
    private List<GroupEntity> groups;

    public void addGroup(GroupEntity g) {
        this.groups.add(g);
    }

}
