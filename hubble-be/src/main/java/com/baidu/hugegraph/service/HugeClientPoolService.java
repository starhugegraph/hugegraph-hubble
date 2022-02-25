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

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import javax.annotation.PreDestroy;

import com.baidu.hugegraph.driver.factory.MetaHugeClientFactory;
import com.baidu.hugegraph.options.HubbleOptions;
import com.baidu.hugegraph.util.HugeClientUtil;
import com.google.common.base.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baidu.hugegraph.config.HugeConfig;
import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.entity.GraphConnection;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
public final class HugeClientPoolService
             extends ConcurrentHashMap<String, HugeClient> {

    @Autowired
    private HugeConfig config;
    @Autowired
    private SettingSSLService sslService;
    @Autowired
    private String cluster;
    @Autowired
    private MetaHugeClientFactory hugeClientFactory;

    @PreDestroy
    public void destroy() {
        log.info("Destroy HugeClient pool");
        for (HugeClient client : this.values()) {
            client.close();
        }
    }

    public HugeClient createUnauthClient() {
        // Get all graphspace under cluster
        return getOrCreate(null, null, null);
    }

    public HugeClient createAuthClient(String graphSpace,
                                       String graph, String token) {
        return getOrCreate(graphSpace, graph, token);
    }

    public synchronized HugeClient getOrCreate(String graphSpace,
                                               String graph,
                                               String token) {
        List<String> urls =
                hugeClientFactory.getServerURL(this.cluster, graphSpace, graph);

        String url = urls.get((int) (Math.random() * urls.size()));

        String key = Strings.lenientFormat("%s-%s-%s-%s", url, graphSpace,
                                           graph, token);

        HugeClient client = super.get(key);
        if (client != null) {
            if (checkHealth(client)) {
                return client;
            } else {
                client.close();
                this.remove(key);
            }
        }

        GraphConnection connection = new GraphConnection();
        connection.setUrl(url);
        connection.setToken(token);
        connection.setGraphSpace(graphSpace);
        connection.setGraph(graph);

        if (connection.getTimeout() == null) {
            int timeout = this.config.get(HubbleOptions.CLIENT_REQUEST_TIMEOUT);
            connection.setTimeout(timeout);
        }
        this.sslService.configSSL(this.config, connection);
        client = HugeClientUtil.tryConnect(connection);
        if (client != null) {
            this.put(key, client);
        }
        return client;
    }

    private boolean checkHealth(HugeClient client) {
        try {
            client.versionManager().getApiVersion();
        } catch (Exception e) {
            log.debug("Check client health throw exception", e);
            return false;
        }

        return true;
    }
}
