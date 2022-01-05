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

import com.baidu.hugegraph.util.PageUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j2;

import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.driver.AuthManager;
import com.baidu.hugegraph.exception.ExternalException;
import com.baidu.hugegraph.structure.auth.Group;


@Log4j2
@Service
public class GroupService extends AuthService {

    public Group get(HugeClient client, String gid) {
        AuthManager auth = client.auth();
        Group group = auth.getGroup(gid);
        if (group == null) {
            throw new ExternalException("auth.role.get.not-exist",
                    gid);
        }

        return group;
    }

    public List<Group> list(HugeClient client) {
        List<Group> roles = client.auth().listGroups();

        return roles;
    }

    public IPage<Group> queryPage(HugeClient client, String query,
                                  int pageNo, int pageSize) {
        List<Group> roles = client.auth().listGroups();

        ArrayList<Group> results = new ArrayList<>();
        client.auth().listGroups().stream().filter((g) -> g.name().contains(query))
              .forEach((g) -> {
                  results.add(g);
              });

        return PageUtil.page(results, pageNo, pageSize);
    }

    public void update(HugeClient client, Group group) {
        AuthManager auth = client.auth();
        if (auth.getGroup(group.id()) == null ) {
            throw new ExternalException("auth.role.not-exist",
                                        group.id(), group.name());
        }

        auth.updateGroup(group);
    }

    public Group insert(HugeClient client, Group group) {
        AuthManager auth = client.auth();

        return auth.createGroup(group);
    }

    public void delete(HugeClient client, String gid) {
        AuthManager auth = client.auth();
        Group group = GroupService.getGroup(auth, gid);

        auth.deleteGroup(gid);

        auth.listAccessesByGroup(group, -1).forEach(
            access -> {
                auth.deleteAccess(access.id());
            }
        );

        auth.listBelongsByGroup(group, -1).forEach(
            belong -> {
                auth.deleteBelong(belong.id());
            }
        );
    }

    protected static Group getGroup(AuthManager auth, String gid) {
        Group group = auth.getGroup(gid);
        if (group == null) {
            throw new ExternalException("auth.role.not-exist",
                    gid);
        }
        return group;
    }
}
