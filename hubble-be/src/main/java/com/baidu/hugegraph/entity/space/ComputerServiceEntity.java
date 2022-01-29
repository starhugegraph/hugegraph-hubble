package com.baidu.hugegraph.entity.space;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComputerServiceEntity {
    @JsonProperty("id")
    public long id;
    @JsonProperty("task_type")
    public String type;
    @JsonProperty("task_name")
    public String name;
    @JsonProperty("task_description")
    public String description;
    @JsonProperty("task_create")
    public long create;
    @JsonProperty("graphspace")
    public String graphSpace;
    @JsonProperty("graph")
    public String graph;
}
