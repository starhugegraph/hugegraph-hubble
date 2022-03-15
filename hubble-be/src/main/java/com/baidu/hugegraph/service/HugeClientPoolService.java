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

import com.google.common.base.Strings;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.log4j.Log4j2;
import org.springframework.util.CollectionUtils;

import com.baidu.hugegraph.config.HugeConfig;
import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.entity.GraphConnection;
import com.baidu.hugegraph.options.HubbleOptions;
import com.baidu.hugegraph.util.HugeClientUtil;
import com.baidu.hugegraph.driver.factory.PDHugeClientFactory;
import com.baidu.hugegraph.exception.ParameterizedException;
import com.baidu.hugegraph.util.UrlUtil;

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
    private PDHugeClientFactory pdHugeClientFactory;

    @PreDestroy
    public void destroy() {
        log.info("Destroy HugeClient pool");
        for (HugeClient client : this.values()) {
            client.close();
        }
    }

    public HugeClient createUnauthClient() {
        // Get all graphspace under cluster
        return getOrCreate(null, null, null, null);
    }

    public HugeClient createAuthClient(String graphSpace,
                                       String graph, String token) {
        return getOrCreate(null, graphSpace, graph, token);
    }

    public HugeClient getOrCreate(String url, String graphSpace, String graph,
                                  String token) {
        if (StringUtils.isEmpty(url)) {
            List<String> urls =
                    pdHugeClientFactory.getAutoURLs(cluster, graphSpace, null);

            if (CollectionUtils.isEmpty(urls)) {
                // Get Service url From Default
                throw new ParameterizedException("service.no-available");
            }
            url = urls.get((int) (Math.random() * urls.size()));
        }

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
        client = create(url, graphSpace, graph, token);
        synchronized (this) {
            if (client != null) {
                HugeClient oldClient = this.get(key);
                if (oldClient != null) {
                    // 其他请求已经创建了新client.
                    client.close();
                    client = oldClient;
                } else {
                    this.put(key, client);
                }
            }
        }
        return client;
    }

    public HugeClient create(String url, String graphSpace, String graph,
                             String token) {
        if (StringUtils.isEmpty(url)) {
            List<String> urls =
                    pdHugeClientFactory.getAutoURLs(this.cluster, graphSpace,
                                                    graph);

            if (CollectionUtils.isEmpty(urls)) {
                // Get Service url From Default
                throw new ParameterizedException("service.no-available");
            }
            url = urls.get((int) (Math.random() * urls.size()));
        }

        GraphConnection connection = new GraphConnection();

        try {
            UrlUtil.Host host = UrlUtil.parseHost(url);
            connection.setProtocol(host.getScheme());
            connection.setHost(host.getHost());
            connection.setPort(host.getPort());
        } catch (IllegalArgumentException e) {
            throw new ParameterizedException("service.url.parse.error", e, url);
        }

        connection.setToken(token);
        connection.setGraphSpace(graphSpace);
        connection.setGraph(graph);

        if (connection.getTimeout() == null) {
            int timeout = this.config.get(HubbleOptions.CLIENT_REQUEST_TIMEOUT);
            connection.setTimeout(timeout);
        }
        this.sslService.configSSL(this.config, connection);
        HugeClient client = HugeClientUtil.tryConnect(connection);

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
