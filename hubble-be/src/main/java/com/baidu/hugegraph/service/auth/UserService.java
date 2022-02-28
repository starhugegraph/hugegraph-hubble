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

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baidu.hugegraph.config.HugeConfig;
import com.baidu.hugegraph.driver.AuthManager;
import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.entity.auth.UserEntity;
import com.baidu.hugegraph.exception.InternalException;
import com.baidu.hugegraph.structure.auth.User;
import com.baidu.hugegraph.util.PageUtil;

@Log4j2
@Service
public class UserService extends AuthService{

    @Autowired
    BelongService belongService;

    @Autowired
    ManagerService managerService;

    @Autowired
    private HugeConfig config;

    public List<UserEntity> listUsers(HugeClient hugeClient) {
        AuthManager auth = hugeClient.auth();

        List<User> users = auth.listUsers();
        List<UserEntity> ues= new ArrayList<>(users.size());
        users.forEach(u -> {
            ues.add(convert(hugeClient, u));
        });

        return ues;
    }

    public UserEntity getUser(HugeClient client, String name) {
        return convert(client, client.auth().getUser(name));
    }

    public Object queryPage(HugeClient hugeClient, String query,
                            int pageNo, int pageSize) {
        List<UserEntity> results =
                hugeClient.auth().listUsers().stream()
                          .filter((u) -> u.name().contains(query))
                          .sorted(Comparator.comparing(User::name))
                          .map((u) -> convert(hugeClient, u))
                          .collect(Collectors.toList());

        return PageUtil.page(results, pageNo, pageSize);
    }


    public UserEntity get(HugeClient hugeClient, String userId) {
        AuthManager auth = hugeClient.auth();
        User user = auth.getUser(userId);
        if (user == null) {
            throw new InternalException("auth.user.get.%s Not Exits",
                    userId);
        }
        UserEntity userEntity = convert(hugeClient, user);

        return userEntity;
    }

    public void add(HugeClient client, UserEntity ue) {
        User user = new User();
        user.name(ue.getName());
        user.password(ue.getPassword());
        user.phone(ue.getPhone());
        user.email(ue.getEmail());
        user.avatar(ue.getAvatar());
        user.description(ue.getDescription());

        User newUser = client.auth().createUser(user);
        if (newUser != null) {
            // add superadmin
            client.auth().addSuperAdmin(newUser.id().toString());
        }
    }


    public void delete(HugeClient hugeClient, String userId) {
        // Delete All Belongs refer the user
        belongService.listByUser(hugeClient, userId).forEach(belongEntity -> {
            belongService.delete(hugeClient, belongEntity.getId());
        });

        hugeClient.auth().deleteUser(userId);
    }

    protected UserEntity convert(HugeClient client, User user) {
        if (user == null) {
            return null;
        }

        UserEntity u = new UserEntity();
        u.setId(user.id().toString());
        u.setName(user.name());
        u.setEmail(user.email());
        u.setPhone(user.phone());
        u.setAvatar(user.avatar());;
        u.setDescription(user.description());
        u.setCreate(user.createTime());
        u.setUpdate(user.updateTime());
        u.setCreator(user.creator());

        u.setSuperadmin(isSuperAdmin(client, user.id().toString()));

        return u;
    }

    public void update(HugeClient hugeClient, UserEntity userEntity) {
        User user = new User();
        user.setId(userEntity.getId());
        user.name(userEntity.getName());
        user.password(userEntity.getPassword());
        user.phone(userEntity.getPhone());
        user.email(userEntity.getEmail());
        user.description(userEntity.getDescription());

        // 设置超级管理员权限
        boolean curSuperAdmin = isSuperAdmin(hugeClient, user.id().toString());
        if (curSuperAdmin && !userEntity.isSuperadmin()) {
            hugeClient.auth().delSuperAdmin(user.id().toString());
        }
        if (!curSuperAdmin && userEntity.isSuperadmin()) {
            hugeClient.auth().addSuperAdmin(user.id().toString());
        }

        hugeClient.auth().updateUser(user);
    }

    public String userLevel(HugeClient client, String uid) {
        User.UserRole role = client.auth().getUserRole(uid);

        if (isSuperAdmin(client, uid)) {
            return "ADMIN";
        }

        if (isSpaceAdmin(client, uid)) {
            return "SPACEADMIN";
        }

        // Default: user
        return "USER";
    }

    public boolean isSuperAdmin(HugeClient client, String uid) {
        // Check: if user is spaceadmin for any graphspace
        return client.auth().listSuperAdmin().contains(uid);
    }

    public boolean isAssignSpaceAdmin(HugeClient client, String uid,
                                String graphSpace) {
        // Check: if user is spaceadmin for one graphSpace
        return client.auth().listSpaceAdmin(graphSpace).contains(uid);
    }

    public boolean isSpaceAdmin(HugeClient client, String uid) {
        // Check: if user is spaceadmin
        List<String> graphSpaces = client.graphSpace().listGraphSpace();
        for (String gs : graphSpaces) {
            if (isAssignSpaceAdmin(client, uid, gs)) {
                return true;
            }
        }

        return false;
    }

    // List graphspace admin
    public List<String> listGraphSpaceAdmin(HugeClient client,
                                          String graphSpace) {
        AuthManager auth = client.auth();

        return auth.listSpaceAdmin(graphSpace);
    }
}
