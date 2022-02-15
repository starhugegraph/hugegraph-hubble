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

package com.baidu.hugegraph.config;

import java.util.Arrays;
import java.util.Objects;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import lombok.extern.log4j.Log4j2;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.baidu.hugegraph.options.HubbleOptions;

@Log4j2
@Configuration
public class ElasticsearchConfig {

    @Autowired
    private HugeConfig config;

    @Bean
    public ElasticsearchClient esClient() {

        RestClient restClient = esRestClient();

        // Create the transport with a Jackson mapper
        ElasticsearchTransport transport = new RestClientTransport(
                restClient, new JacksonJsonpMapper());
        // And create the API client
        ElasticsearchClient client = new ElasticsearchClient(transport);

        return client;
    }

    public RestClient esRestClient() {

        String[] esAddresses = config.get(HubbleOptions.ES_URL).split(",");

        HttpHost[] hosts = Arrays.stream(esAddresses)
                                 .map(HttpHost::create)
                                 .filter(Objects::nonNull)
                                 .toArray(HttpHost[]::new);
        log.debug("es.hosts:{}", Arrays.toString(hosts));

        RestClient restClient = RestClient.builder(hosts).build();

        return restClient;
    }
}
