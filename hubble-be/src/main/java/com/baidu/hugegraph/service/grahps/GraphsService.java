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

package com.baidu.hugegraph.service.grahps;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.baidu.hugegraph.structure.auth.HugePermission;
import com.baidu.hugegraph.structure.auth.HugeResource;
import com.baomidou.mybatisplus.core.metadata.IPage;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.loader.util.JsonUtil;
import com.baidu.hugegraph.structure.auth.User;
import com.baidu.hugegraph.util.PageUtil;

@Log4j2
@Service
public class GraphsService {

    public Map<String, String> get(HugeClient client, String graph) {
        return client.graphs().getGraph(graph);
    }

    public IPage<Map<String, String>> queryPage(HugeClient client,
                                                String graphSpace, String uid,
                                                String query, int pageNo,
                                                int pageSize) {
        ArrayList<Map<String, String>> results = new ArrayList<>();
        // Get All graphs
        // client.graphs().listGraph().stream().filter((g) -> g.contains(query))
        //       .forEach((g) -> {
        //           results.add(client.graphs().getGraph(g));
        //       });

        // Get authorized graphs
        listGraphNames(client, graphSpace, uid)
                .stream().filter((g) -> g.contains(query))
                .forEach((g) -> {
                    results.add(client.graphs().getGraph(g));
                });

        return PageUtil.page(results, pageNo, pageSize);
    }

    public Set<String> listGraphNames(HugeClient client, String graphSpace,
                                      String uid) {
        if (uid == null) {
            // Get All GraphNames
            return new HashSet<>(client.graphs().listGraph());
        }

        HashSet<String> result = new HashSet<String>();

        // Get All authorized graphs
        User.UserRole role = client.auth().getUserRole(uid);
        Map<String, Map<HugePermission, List<HugeResource>>>
                graphs = role.roles().getOrDefault(graphSpace, null);
        if (graphs != null) {
            result.addAll(graphs.keySet());
        }
        return result;
    }

    public Map<String, String> create(HugeClient client, String graph,
                                      boolean isAuth, String schemaTemplate) {
        Map<String, String> conf = new HashMap<>();
        if (isAuth) {
            conf.put("gremlin.graph",
                     "com.baidu.hugegraph.auth.HugeFactoryAuthProxy");

        } else {
            conf.put("gremlin.graph", "com.baidu.hugegraph.HugeFactory");
        }
        if (!StringUtils.isEmpty(schemaTemplate)) {
            conf.put("schema.init_template", schemaTemplate);
        }


        conf.put("store", graph);
        conf.put("backend", "rocksdb");
        conf.put("serializer", "binary");
        conf.put("rocksdb.data_path", "./" + graph);
        conf.put("rocksdb.waf_path", "./" + graph);

        return client.graphs().createGraph(graph, JsonUtil.toJson(conf));
    }

    public void truncate(HugeClient client, String graph,
                         boolean isClearSchema) {
        client.graphs().clear(graph, isClearSchema);
    }

    public void delete(HugeClient client, String graph, String confirmMessage) {

        client.graphs().remove(graph, confirmMessage);
    }
}
