/*
 *
 *  * Copyright 2017 HugeGraph Authors
 *  *
 *  * Licensed to the Apache Software Foundation (ASF) under one or more
 *  * contributor license agreements. See the NOTICE file distributed with this
 *  * work for additional information regarding copyright ownership. The ASF
 *  * licenses this file to You under the Apache License, Version 2.0 (the
 *  * "License"); you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *     http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  * License for the specific language governing permissions and limitations
 *  * under the License.
 *
 */

package com.baidu.hugegraph.entity.space;

import java.util.List;

import com.baidu.hugegraph.structure.space.GraphSpace;
import com.baidu.hugegraph.util.JsonUtil;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GraphSpaceEntity extends GraphSpace {
    @JsonProperty("graphspace_admin")
    public List<String> graphspaceAdmin;

    public GraphSpaceEntity() {
    }

    public static GraphSpaceEntity fromGraphSpace(GraphSpace graphSpace) {
        return JsonUtil.fromJson(JsonUtil.toJson(graphSpace), GraphSpaceEntity.class);
    }

    public GraphSpace convertGraphSpace() {
        // Generate GraphSpace instance From GraphSpaceEntity
        return JsonUtil.fromJson(JsonUtil.toJson(this), GraphSpace.class);
    }
}
