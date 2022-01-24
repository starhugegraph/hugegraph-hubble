/*
 * Copyright 2017 HugeGraph Authors
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to You under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

package com.baidu.hugegraph.controller.space;

import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.entity.space.GraphSpaceEntity;
import com.baidu.hugegraph.service.auth.BelongService;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.ImmutableSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baidu.hugegraph.service.space.GraphSpaceService;
import com.baidu.hugegraph.structure.space.GraphSpace;
import com.baidu.hugegraph.common.Constant;
import com.baidu.hugegraph.controller.BaseController;

@RestController
@RequestMapping(Constant.API_VERSION + "graphspaces")
public class GraphSpaceController extends BaseController {

    @Autowired
    private GraphSpaceService graphSpaceService;

    @GetMapping("list")
    public Object list() {

        ImmutableSet<String> graphSpaces =
                this.clientService.listAllGraphSpaces();
        return ImmutableMap.of("graphspaces", graphSpaces);
    }

    @GetMapping
    public Object queryPage(@RequestParam(name = "query", required = false,
                                    defaultValue = "") String query,
                            @RequestParam(name = "page_no", required = false,
                                    defaultValue = "1") int pageNo,
                            @RequestParam(name = "page_size", required = false,
                                    defaultValue = "10") int pageSize) {
        return graphSpaceService.queryPage(this.authClient(null, null),
                                           query, pageNo, pageSize);
    }

    @GetMapping("{graphspace}")
    public GraphSpaceEntity get(@PathVariable("graphspace") String graphspace) {
        HugeClient client = this.authClient(null, null);
        // Get GraphSpace Info
        GraphSpace graphSpace
                = graphSpaceService.get(client, graphspace);

        GraphSpaceEntity graphSpaceEntity
                = GraphSpaceEntity.fromGraphSpace(graphSpace);

        // TODO: Get GraphSpace Admin List

        return graphSpaceEntity;
    }

    @PostMapping
    public Object add(@RequestBody GraphSpaceEntity graphSpaceEntity) {
        // Create GraphSpace
        graphSpaceService.create(this.authClient(null, null),
                                 graphSpaceEntity.convertGraphSpace());

        // TODO: Add GraphSpace Admin

        return get(graphSpaceEntity.getName());
    }

    @PutMapping("{graphspace}")
    public GraphSpace update(@PathVariable("graphspace") String graphspace,
                             @RequestBody GraphSpaceEntity graphSpaceEntity) {

        graphSpaceEntity.setName(graphspace);

        // Update graphspace
        graphSpaceService.update(this.authClient(null, null),
                                 graphSpaceEntity.convertGraphSpace());

        // TODO: Update graphspace admin

        return get(graphSpaceEntity.getName());
    }

    @DeleteMapping("{graphspace}")
    public void delete(@PathVariable("graphspace") String graphspace) {
        // TODO: Delete graphspace admin

        // delete graphspace
        graphSpaceService.delete(this.authClient(null, null), graphspace);
    }
}
