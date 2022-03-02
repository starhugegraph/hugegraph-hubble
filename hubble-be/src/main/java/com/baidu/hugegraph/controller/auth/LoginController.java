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

import com.baidu.hugegraph.entity.auth.UserEntity;
import com.google.common.collect.ImmutableMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.structure.auth.Login;
import com.baidu.hugegraph.common.Constant;
import com.baidu.hugegraph.controller.BaseController;
import com.baidu.hugegraph.service.auth.UserService;
import com.baidu.hugegraph.structure.auth.LoginResult;

@RestController
@RequestMapping(Constant.API_VERSION + "auth")
public class LoginController extends BaseController {

    @Autowired
    UserService userService;

    @PostMapping("/login")
    public Object login(@RequestBody Login login) {
        // Set Expire: 1 Month
        login.expire(60 * 60 * 24 * 30);

        HugeClient client = unauthClient();
        LoginResult result = client.auth().login(login);

        this.setUser(login.name());
        this.setSession("password", login.password());
        this.setToken(result.token());

        // Get Current User Info
        client = this.authClient(null, null);
        UserEntity u = userService.getUser(client, login.name());
        u.setSuperadmin(userService.isSuperAdmin(client));

        return u;
    }

    @GetMapping("/status")
    public Object status() {

        HugeClient client = authClient(null, null);

        String level = userService.userLevel(client);

        return ImmutableMap.of("level", level);
    }

    @GetMapping("/logout")
    public void logout() {
        this.delToken();
    }
}
