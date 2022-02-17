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

import com.baidu.hugegraph.driver.HugeClient;
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
import com.baidu.hugegraph.service.auth.AccessService;
import com.baidu.hugegraph.entity.auth.AccessEntity;

@RestController
@RequestMapping(Constant.API_VERSION + "graphspaces/{graphspace}/auth/accesses")
public class AccessController extends AuthController {

    @Autowired
    AccessService accessService;

    @GetMapping
    public List<AccessEntity> list(@PathVariable("graphspace") String graphSpace,
                                   @RequestParam(value="group_id", required = false) String gid,
                                   @RequestParam(value="target_id", required = false) String tid) {
        HugeClient client = this.authClient(graphSpace, null);
        return this.accessService.list(client, gid, tid);
    }

    @GetMapping("{id}")
    public AccessEntity get(@PathVariable("graphspace") String graphSpace,
                            @PathVariable("id") String aid) {
        HugeClient client = this.authClient(graphSpace, null);
        return this.accessService.get(client, aid);
    }

    @PostMapping
    public AccessEntity add(@PathVariable("graphspace") String graphSpace,
                            @RequestBody AccessEntity accessEntity) {
        HugeClient client = this.authClient(graphSpace, null);
        return this.accessService.addOrUpdate(client, accessEntity);
    }

    @PutMapping
    public AccessEntity update(@PathVariable("graphspace") String graphSpace,
                               @RequestBody AccessEntity accessEntity) {
        HugeClient client = this.authClient(graphSpace, null);
        return this.accessService.addOrUpdate(client, accessEntity);
    }

    @DeleteMapping
    public void delete(@PathVariable("graphspace") String graphSpace,
                       @RequestParam("group_id") String groupId,
                       @RequestParam("target_id") String targetId) {
        HugeClient client = this.authClient(graphSpace, null);
        this.accessService.delete(client, groupId, targetId);
    }
}
