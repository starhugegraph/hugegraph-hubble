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
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baidu.hugegraph.driver.AuthManager;
import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.entity.auth.BelongEntity;
import com.baidu.hugegraph.entity.auth.UserEntity;
import com.baidu.hugegraph.exception.InternalException;
import com.baidu.hugegraph.structure.auth.Belong;
import com.baidu.hugegraph.structure.auth.Group;
import com.baidu.hugegraph.util.PageUtil;

@Log4j2
@Service
public class BelongService extends AuthService {
    @Autowired
    protected GroupService roleService;
    @Autowired
    protected UserService userService;

    public void add(HugeClient client, String gid, String uid) {
        Belong belong = new Belong();
        belong.user(uid);
        belong.group(gid);
        this.add(client, belong);
    }

    public void add(HugeClient client, Belong belong) {
        AuthManager auth = client.auth();
        auth.createBelong(belong);
    }

    public void addMany(HugeClient client, String gid, String[] uids) {
        Belong belong = new Belong();
        for (String uid : uids) {
            belong.user(uid);
            belong.group(gid);
            this.add(client, belong);
        }
    }


    public void delete(HugeClient client, String bid) {
        AuthManager auth = client.auth();
        auth.deleteBelong(bid);
    }

    public void delete(HugeClient client, String groupId, String userId) {
        list(client, groupId, userId).forEach((b) -> {
            client.auth().deleteBelong(b.getId());
        });
    }

    protected List<BelongEntity> listByUser(HugeClient client, String uid) {
        AuthManager auth = client.auth();
        List<BelongEntity> result = new ArrayList<>();

        auth.listBelongsByUser(uid, -1).forEach(b -> {
            BelongEntity entity = convert(client, b);
            if (entity != null) {
                result.add(entity);
            }
        });

        return result;
    }

    public List<BelongEntity> listByGroup(HugeClient client, String gid) {
        Group group = roleService.get(client, gid);

        List<BelongEntity> result = new ArrayList<>();

        client.auth().listBelongsByGroup(gid, -1).forEach(b -> {
            BelongEntity entity = convert(client, b);
            if (entity != null) {
                result.add(entity);
            }
        });

        return result;
    }

    public List<BelongEntity> listAll(HugeClient client) {
        List<BelongEntity> result = new ArrayList<>();

        client.auth().listBelongs().forEach(b -> {
            BelongEntity entity = convert(client, b);
            if (entity != null) {
                result.add(entity);
            }
        });

        return result;
    }

    public List<BelongEntity> list(HugeClient client, String gid, String uid) {
        AuthManager auth = client.auth();

        List<BelongEntity> result = new ArrayList<>();

        if (StringUtils.isEmpty(uid) && StringUtils.isEmpty(gid)) {
            return listAll(client);
        } else if (StringUtils.isEmpty(uid) && !StringUtils.isEmpty(gid)) {
            return this.listByGroup(client, gid);
        } else if (!StringUtils.isEmpty(uid) && StringUtils.isEmpty(gid)) {
            return this.listByUser(client, uid);
        } else {
            auth.listBelongsByGroup(gid, -1).forEach(b -> {
                BelongEntity entity = convert(client, b);
                if (entity != null && entity.getUserId().equals(uid)) {
                    result.add(entity);
                }
            });
        }

        return result;
    }

    public IPage<BelongEntity> listPage(HugeClient client, String gid,
                                        String uid, int pageNo, int pageSize) {
        return PageUtil.page(list(client, gid, uid), pageNo, pageSize);
    }

    public BelongEntity get(HugeClient client, String bid) {
        AuthManager auth = client.auth();
        Belong belong = auth.getBelong(bid);
        if (belong == null) {
            throw new InternalException("auth.belong.get.{} Not Exits",
                                        bid);
        }

        return convert(client, belong);
    }

    protected BelongEntity convert(HugeClient client, Belong belong) {

        try {
            Group group = roleService.get(client, belong.group().toString());
            UserEntity user = userService.get(client, belong.user().toString());

            return new BelongEntity(belong.id().toString(),
                                    user.getId(), user.getName(),
                                    group.id().toString(), group.name());
        } catch (Exception e) {
            log.warn("convert belong error", e);
        }

        return null;
    }

    public void deleteMany(HugeClient client, String[] ids) {
        Arrays.stream(ids).forEach(id -> {
            client.auth().deleteBelong(id);
        });
    }

    public boolean exists(HugeClient client, String gid, String uid) {
        if (this.list(client, gid, uid).size() > 0) {
            return true;
        }

        return false;
    }

    public static class BelongsReq {
        @JsonProperty("user_ids")
        Set<String> userIds = new HashSet<String>();
        @JsonProperty("group_id")
        String groupId;
        @JsonProperty("belong_description")
        String description;

        public BelongsReq() {
        }

        public Set<String> getUserIds() {
            return userIds;
        }

        public BelongsReq setUserIds(Set<String> userIds) {
            this.userIds = userIds;
            return this;
        }

        public String getGroupId() {
            return groupId;
        }

        public BelongsReq setGroupId(String groupId) {
            this.groupId = groupId;
            return this;
        }

        public String getDescription() {
            return description;
        }

        public BelongsReq setDescription(String description) {
            this.description = description;
            return this;
        }
    }
}
