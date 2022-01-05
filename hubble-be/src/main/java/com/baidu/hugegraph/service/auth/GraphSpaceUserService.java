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
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import com.baidu.hugegraph.entity.auth.GroupEntity;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.google.common.collect.ArrayListMultimap;
import com.google.common.collect.Multimap;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.entity.auth.BelongEntity;
import com.baidu.hugegraph.entity.auth.UserView;
import com.baidu.hugegraph.structure.auth.Belong;
import com.baidu.hugegraph.util.E;
import com.baidu.hugegraph.util.PageUtil;

@Log4j2
@Service
public class GraphSpaceUserService extends AuthService{

    @Autowired
    private BelongService belongService;
    @Autowired
    private GroupService groupService;

    public List<UserView> listUsers(HugeClient client) {

        List<UserView> uvs = new ArrayList<>();

        List<BelongEntity> belongs = new ArrayList<>();
        groupService.list(client).forEach((g) -> {
            belongs.addAll(belongService.listByGroup(client, g.id().toString()));
        });

        Multimap<String, BelongEntity> tmp = ArrayListMultimap.create();
        belongs.forEach(belong -> {
            tmp.put(belong.getUserId(), belong);
        });

        tmp.keys().forEach((k) -> {
            UserView uv = new UserView(null, null, new ArrayList<GroupEntity>());
            tmp.get(k).forEach((b) -> {
                uv.setId(b.getUserId());
                uv.setName(b.getUserName());
                uv.addGroup(new GroupEntity(b.getGroupId(), b.getGroupName()));
            });
            uvs.add(uv);
        });

        return uvs;
    }

    public UserView getUser(HugeClient client, String uid) {

        List<UserView> uvs = new ArrayList<>();

        List<BelongEntity> belongs = belongService.listByUser(client, uid);

        UserView uv = new UserView(null, null,
                                   new ArrayList<GroupEntity>(belongs.size()));
        belongs.forEach((b) -> {
            uv.setId(b.getUserId());
            uv.setName(b.getUserName());
            uv.addGroup(new GroupEntity(b.getGroupId(), b.getGroupName()));
        });

        return uv;
    }

    public IPage<UserView> queryPage(HugeClient client, String query,
                                     int pageNo, int pageSize) {
        List<UserView> users = listUsers(client);
        List<UserView> results =
                users.stream()
                     .filter((u) -> u.getName().contains(query))
                     .sorted(Comparator.comparing(UserView::getName))
                     .collect(Collectors.toList());

        return PageUtil.page(results, pageNo, pageSize);
    }

    public UserView create(HugeClient client, UserView userView) {
        E.checkNotNull(userView.getId(), "User Id Not Null");
        E.checkArgument(userView.getGroups() != null
                                && userView.getGroups().size() > 0
                , "THe group info is empty");

        int s = belongService.listByUser(client, userView.getId()).size();
        E.checkState(s == 0, "The user has exists");


        userView.getGroups().forEach((g -> {
            Belong belong = new Belong();
            belong.user(userView.getId());
            belong.group(g.getId());
            belongService.add(client, belong);
        }));

        return getUser(client, userView.getId());
    }

    public void unauthUser(HugeClient client, String uid) {
        List<BelongEntity> belongs = belongService.listByUser(client, uid);
        E.checkState(!belongs.isEmpty(), "The user: (%s) not exists", uid);
        belongs.forEach((b) -> {
            belongService.delete(client, b.getId().toString());
        });
    }
}
