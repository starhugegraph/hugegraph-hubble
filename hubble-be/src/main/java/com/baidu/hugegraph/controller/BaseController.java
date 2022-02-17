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

package com.baidu.hugegraph.controller;

import java.util.List;
import javax.servlet.http.HttpServletRequest;

import com.baidu.hugegraph.common.Constant;
import com.baidu.hugegraph.driver.HugeClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.baidu.hugegraph.common.Identifiable;
import com.baidu.hugegraph.common.Mergeable;
import com.baidu.hugegraph.util.EntityUtil;
import com.baidu.hugegraph.util.Ex;
import com.baidu.hugegraph.service.ClientService;

@Component
public abstract class BaseController {

    @Autowired
    protected String cluster;

    @Autowired
    protected ClientService clientService;

    public static final String ORDER_ASC = "asc";
    public static final String ORDER_DESC = "desc";

    public void checkIdSameAsBody(Object id, Identifiable newEntity) {
        Ex.check(newEntity.getId() != null, () -> id.equals(newEntity.getId()),
                 "common.param.path-id-should-same-as-body",
                 id, newEntity.getId());
    }

    public void checkParamsNotEmpty(String name, String value,
                                    boolean creating) {
        if (creating) {
            Ex.check(!StringUtils.isEmpty(value),
                     "common.param.cannot-be-null-or-empty", name);
        } else {
            // The default null and user-passed null indicate no update
            Ex.check(value == null || !value.isEmpty(),
                     "common.param.cannot-be-empty", name);
        }
    }

    public void checkParamsNotEmpty(String name, List<?> values) {
        Ex.check(values != null && !values.isEmpty(),
                 "common.param.cannot-be-null-or-empty", name);
    }

    public <T extends Mergeable> T mergeEntity(T oldEntity, T newEntity) {
        return EntityUtil.merge(oldEntity, newEntity);
    }

    protected void setSession(String key, Object value) {
        HttpServletRequest request = ((ServletRequestAttributes)
                RequestContextHolder.getRequestAttributes()).getRequest();
        request.getSession().setAttribute(key, value);
    }

    protected Object getSession(String key) {
        HttpServletRequest request = ((ServletRequestAttributes)
                RequestContextHolder.getRequestAttributes()).getRequest();
        return request.getSession().getAttribute(key);

    }

    protected String getUser() {
        return (String) getSession("username");
    }

    protected void setUser(String username) {
        setSession("username", username);
    }

    protected void delSession(String key) {
        HttpServletRequest request = ((ServletRequestAttributes)
                RequestContextHolder.getRequestAttributes()).getRequest();
        request.getSession().removeAttribute(key);
    }

    protected String getToken() {
        return (String) getSession(Constant.TOKEN_KEY);
    }

    protected void setToken(String token) {
        this.setSession(Constant.TOKEN_KEY, token);
    }

    protected void delToken() {
        this.delSession(Constant.TOKEN_KEY);
    }

    protected HugeClient authClient(String graphspace, String graph) {
        return this.clientService.createAuthClient(graphspace, graph,
                                                   this.getToken());
    }

    protected HugeClient unauthClient() {
        return this.clientService.createUnauthClient();
    }

}
