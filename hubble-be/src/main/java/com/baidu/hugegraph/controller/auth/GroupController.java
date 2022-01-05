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

package com.baidu.hugegraph.controller.auth;

import java.util.List;

import com.baomidou.mybatisplus.core.metadata.IPage;
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

import com.baidu.hugegraph.common.Constant;
import com.baidu.hugegraph.service.auth.GroupService;
import com.baidu.hugegraph.structure.auth.Group;
import com.baidu.hugegraph.driver.HugeClient;

@RestController
@RequestMapping(Constant.API_VERSION + "graphspaces/{graphspace}/auth/groups")
public class GroupController<role> extends AuthController {

    @Autowired
    private GroupService groupService;

    @GetMapping("list")
    public List<Group> listName(@PathVariable("graphspace") String graphSpace) {
        HugeClient client = this.authClient(graphSpace, null);
        return this.groupService.list(client);
    }

    public List<Group> list(@PathVariable("graphspace") String graphSpace) {
        HugeClient client = this.authClient(graphSpace, null);
        return this.groupService.list(client);
    }

    @GetMapping
    public IPage<Group> queryPage(@PathVariable("graphspace") String graphSpace,
                                  @RequestParam(name = "query", required = false,
                                    defaultValue = "") String query,
                                  @RequestParam(name = "page_no", required = false,
                                    defaultValue = "1") int pageNo,
                                  @RequestParam(name = "page_size", required = false,
                                    defaultValue = "10") int pageSize) {
        HugeClient client = this.authClient(graphSpace, null);
        return this.groupService.queryPage(client, query, pageNo, pageSize);
    }

    @GetMapping("{id}")
    public Group get(@PathVariable("graphspace") String graphSpace,
                     @PathVariable("id") String gid) {
        HugeClient client = this.authClient(graphSpace, null);
        return this.groupService.get(client, gid);
    }

    @PostMapping
    public Group add(@PathVariable("graphspace") String graphSpace,
                    @RequestBody Group role) {
        HugeClient client = this.authClient(graphSpace, null);
        role.graphSpace(graphSpace);
        return this.groupService.insert(client, role);
    }

    @PutMapping("{id}")
    public Group update(@PathVariable("graphspace") String graphSpace,
                        @PathVariable("id") String id,
                        @RequestBody Group group) {
        HugeClient client = this.authClient(graphSpace, null);
        Group g = this.groupService.get(client, id);
        // Can't update group name;
        // g.name(group.name());
        g.description(group.description());

        this.groupService.update(client, g);

        return g;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("graphspace") String graphSpace,
                       @PathVariable("id") String id) {
        HugeClient client = this.authClient(graphSpace, null);
        this.groupService.delete(client, id);
    }
}
