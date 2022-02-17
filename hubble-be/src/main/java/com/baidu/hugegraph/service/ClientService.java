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

package com.baidu.hugegraph.service;

import java.util.HashSet;
import java.util.Set;

import com.google.common.collect.ImmutableSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baidu.hugegraph.entity.graphs.GraphEntity;
import com.baidu.hugegraph.driver.factory.MetaHugeClientFactory;
import com.baidu.hugegraph.driver.HugeClient;

@Service
public class ClientService {
    @Autowired
    protected String cluster;

    @Autowired
    protected MetaHugeClientFactory hugeClientFactory;

    public HugeClient createUnauthClient() {
        // Get all graphspace under cluster
        return hugeClientFactory.createUnauthClient(this.cluster, null, null);
    }

    public HugeClient createAuthClient(String graphSpace,
                                       String graph, String token) {
        return hugeClientFactory.createAuthClient(this.cluster, graphSpace,
                                                  graph, token, null, null);
    }

    public ImmutableSet<GraphEntity> listAllGraphs() {

        Set<GraphEntity> graphs = new HashSet<>();

        Set<String> spaces =
                this.hugeClientFactory.listGraphSpaces(this.cluster);

        for(String space: spaces) {
            this.hugeClientFactory
                    .listGraphs(this.cluster, space)
                    .forEach((g) -> {
                        graphs.add(new GraphEntity(cluster, space, g));
                    });

        }
        return ImmutableSet.copyOf(graphs);
    }





    public ImmutableSet<String> listAllGraphSpaces() {

        Set<String> graphSpaces = new HashSet<>();

        this.hugeClientFactory.listGraphSpaces(this.cluster)
                              .stream().sorted().forEach((p) -> {
                graphSpaces.add(p);
            });

        return ImmutableSet.copyOf(graphSpaces);
    }
}
