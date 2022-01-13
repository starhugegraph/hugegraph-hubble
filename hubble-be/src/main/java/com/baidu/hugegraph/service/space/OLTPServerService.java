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

package com.baidu.hugegraph.service.space;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import com.baomidou.mybatisplus.core.metadata.IPage;

import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.util.PageUtil;
import com.baidu.hugegraph.structure.space.OLTPService;

@Service
public class OLTPServerService {

    public IPage<Object> queryPage(HugeClient client, String query,
                                        int pageNo, int pageSize) {
        List<String> serviceNames = client.serviceManager().listService();
        List<Object> result
                = serviceNames.stream().filter(s -> s.contains(query)).sorted()
                              .map((s) -> client.serviceManager().getService(s))
                              .collect(Collectors.toList());

        return PageUtil.page(result, pageNo, pageSize);
    }

    public Object get(HugeClient client, String service) {
        return client.serviceManager().getService(service);
    }

    public Object create(HugeClient client, OLTPService service) {
        return client.serviceManager().addService(service);
    }

    public void delete(HugeClient client, String service) {
        client.serviceManager().delService(service, "I'm sure to delete the service");
    }

    public Object update(HugeClient client, OLTPService service) {
        return client.serviceManager().updateService(service);
    }
}
