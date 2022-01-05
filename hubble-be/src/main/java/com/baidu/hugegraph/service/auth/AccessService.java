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

package com.baidu.hugegraph.service.auth;

import java.util.ArrayList;
import java.util.List;

import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.entity.auth.AccessEntity;
import com.baidu.hugegraph.structure.auth.Group;
import com.baidu.hugegraph.structure.auth.Target;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.log4j.Log4j2;

import com.baidu.hugegraph.structure.auth.Access;
import com.baidu.hugegraph.exception.ExternalException;


@Log4j2
@Service
public class AccessService extends AuthService {

    @Autowired
    GroupService groupService;

    @Autowired
    TargetService targetService;

    public AccessEntity get(HugeClient client, String aid) {
        Access access = client.auth().getAccess(aid);
        if (access == null) {
            throw new ExternalException("auth.access.not-exist.id", aid);
        }

        Group group = this.groupService.get(client, access.group().toString());
        Target target = this.targetService
                            .get(client, access.target().toString());

        return convert(access, group, target);
    }

    public List<AccessEntity> list(HugeClient client, String gid, String tid) {
        List<AccessEntity> result = new ArrayList<>();
        client.auth().listAccessesByGroup(gid, -1).forEach(access -> {
            if (tid == null || access.target().toString().equals(tid)) {
                Group group = this.groupService
                                  .get(client, access.group().toString());
                Target target = this.targetService
                                    .get(client, access.target().toString());
                result.add(convert(access, group, target));
            }
        });
        return result;
    }

    public Access add(HugeClient client, Access access) {
        return client.auth().createAccess(access);
    }

    public void delete(HugeClient client, String aid) {
        client.auth().deleteAccess(aid);
    }

    protected AccessEntity convert(Access access, Group group, Target target) {

        return new AccessEntity(access.id().toString(),
                                target.id().toString(), target.name(),
                                group.id().toString(), group.name(),
                                target.graphSpace());
    }
}
