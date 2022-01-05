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

import com.baidu.hugegraph.driver.AuthManager;
import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.entity.auth.UserEntity;
import com.baidu.hugegraph.exception.InternalException;
import com.baidu.hugegraph.structure.auth.User;
import com.baidu.hugegraph.util.PageUtil;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Log4j2
@Service
public class UserService extends AuthService{

    public List<UserEntity> listUsers(HugeClient hugeClient) {
        AuthManager auth = hugeClient.auth();

        List<User> users = auth.listUsers();
        List<UserEntity> ues= new ArrayList<>(users.size());
        users.forEach(u -> {
            ues.add(convert(u));
        });

        return ues;
    }

    public Object queryPage(HugeClient hugeClient, String query,
                            int pageNo, int pageSize) {
        List<UserEntity> results =
                hugeClient.auth().listUsers().stream()
                          .filter((u) -> u.name().contains(query))
                          .sorted(Comparator.comparing(User::name))
                          .map((u) -> convert(u))
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
        return convert(user);
    }

    public void add(HugeClient client, UserEntity ue) {
        User user = new User();
        user.name(ue.getName());
        client.auth().createUser(user);
    }


    public void delete(HugeClient hugeClient, String userId) {
        hugeClient.auth().deleteUser(userId);
    }

    protected UserEntity convert(User user) {
        if (user == null) {
            return null;
        }

        UserEntity u = new UserEntity();
        u.setId(user.id().toString());
        u.setName(user.name());
        u.setEmail(user.email());
        u.setPhone(user.phone());
        u.setDescription(u.getDescription());

        return u;
    }

    public Object update(HugeClient hugeClient, User user) {
        return hugeClient.auth().updateUser(user);
    }

    public Object create(HugeClient hugeClient, User user) {
        return hugeClient.auth().createUser(user);
    }
}
