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

import com.baidu.hugegraph.options.HubbleOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.baidu.hugegraph.driver.factory.MetaHugeClientFactory;

@Configuration
public class MetaConfig {


    @Autowired
    private HugeConfig config;

    @Bean("cluster")
    public String getCluster() {
        return this.config.get(HubbleOptions.META_CLUSTER);
    }

    @Bean
    MetaHugeClientFactory hugeClientFactory() {
        String type = this.config.get(HubbleOptions.META_TYPE);
        String[] endpoints =
                this.config.get(HubbleOptions.META_ENDPOINTS).split(",");
        String ca = this.config.get(HubbleOptions.META_CA);
        String clientCa = this.config.get(HubbleOptions.META_CLIENT_CA);
        String clientKey = this.config.get(HubbleOptions.META_CLIENT_KEY);

        MetaHugeClientFactory.MetaDriverType metaType
                = MetaHugeClientFactory.MetaDriverType.valueOf(type.toUpperCase());

        return new MetaHugeClientFactory(metaType, endpoints, ca,
                                         clientCa, clientKey);
    }

}
