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
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.baidu.hugegraph.entity.auth.BelongEntity;
import com.baidu.hugegraph.structure.auth.HugePermission;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.ArrayListMultimap;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Multimap;
import org.apache.commons.collections.MultiMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.log4j.Log4j2;

import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.entity.auth.AccessEntity;
import com.baidu.hugegraph.structure.auth.Group;
import com.baidu.hugegraph.structure.auth.Target;
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

    private List<Access> list0(HugeClient client, String gid, String tid) {
        List<Access> result = new ArrayList<>();
        client.auth().listAccessesByGroup(gid, -1).forEach(access -> {
            if (tid == null || access.target().toString().equals(tid)) {
                result.add(access);
            }
        });
        return result;
    }

    public List<AccessEntity> list(HugeClient client, String gid, String tid) {
        List<AccessEntity> result = new ArrayList<>();
        List<Access> accesses = list0(client, gid, tid);

        Multimap<ImmutableList<String>, Access> tmp =
                ArrayListMultimap.create();

        accesses.forEach(access -> {
            tmp.put(ImmutableList.of(access.group().toString(),
                                     access.target().toString()),
                    access);
        });

        tmp.keySet().forEach(key -> {
            Group group = this.groupService.get(client, key.get(0));
            Target target = this.targetService.get(client, key.get(1));
            result.add(convert(tmp.get(key), group, target));
        });

        return result;
    }

    public AccessEntity addOrUpdate(HugeClient client, AccessEntity accessEntity) {
        List<Access> accesses = list0(client, accessEntity.getGroupId(),
                                      accessEntity.getTargetId());
        
        // CurrentPermission
        Set<HugePermission> curPermissions
                = accesses.stream().map(Access::permission)
                          .collect(Collectors.toSet());

        // Delete
        accesses.forEach(access -> {
            if(!accessEntity.getPermissions().contains(access.permission())) {
                client.auth().deleteAccess(access.id());
            }
        });

        // Add
        accessEntity.getPermissions().forEach(permission -> {
            if (!curPermissions.contains(permission)) {
                Access access = new Access();
                access.graphSpace(accessEntity.getGraphSpace());
                access.group(accessEntity.getGroupId());
                access.target(accessEntity.getTargetId());
                access.permission(permission);
                client.auth().createAccess(access);
            }
        });

        List<AccessEntity> results = list(client, accessEntity.getGroupId(),
                                          accessEntity.getTargetId());

        if (results.isEmpty()) {
            return null;
        }

        return results.get(0);
    }

    public void delete(HugeClient client, String gid, String tid) {
        list0(client, gid, tid).forEach(access -> {
            client.auth().deleteAccess(access.id());
        });
    }

    protected AccessEntity convert(Access access, Group group, Target target) {

        AccessEntity ae = new AccessEntity(target.id().toString(), target.name(),
                                           group.id().toString(), group.name(),
                                           target.graphSpace(), target.graph(),
                                           new HashSet<>());

        ae.addPermission(access.permission());

        return ae;
    }

    protected AccessEntity convert(Collection<Access> accesses, Group group,
                                   Target target) {

        AccessEntity ae = new AccessEntity(target.id().toString(), target.name(),
                                           group.id().toString(), group.name(),
                                           target.graphSpace(), target.graph(),
                                           new HashSet<>());
        accesses.forEach(access -> {
            ae.addPermission(access.permission());
        });

        return ae;
    }

    public static class AccessReq {
        public static final String DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";

        @JsonProperty("id")
        protected Object id;

        @JsonProperty("graphspace")
        protected String graphSpace;
        @JsonProperty("group")
        protected Object group;
        @JsonProperty("target")
        protected Object target;
        @JsonProperty("access_permission")
        protected Set<String> permissions;
        @JsonProperty("access_description")
        protected String description;

        @JsonProperty("access_create")
        @JsonFormat(pattern = DATE_FORMAT)
        protected Date create;
        @JsonProperty("access_update")
        @JsonFormat(pattern = DATE_FORMAT)
        protected Date update;
        @JsonProperty("access_creator")
        protected String creator;
    }
}
