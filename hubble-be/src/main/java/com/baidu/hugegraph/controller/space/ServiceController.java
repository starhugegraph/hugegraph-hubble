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

package com.baidu.hugegraph.controller.space;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baidu.hugegraph.driver.factory.PDHugeClientFactory;
import com.baidu.hugegraph.exception.ParameterizedException;
import com.baidu.hugegraph.common.Constant;
import com.baidu.hugegraph.controller.BaseController;
import com.baidu.hugegraph.service.space.OLTPServerService;
import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.structure.space.OLTPService;

import java.util.List;

@RestController
@RequestMapping(Constant.API_VERSION + "graphspaces/{graphspace}/services/oltp")
public class ServiceController extends BaseController {

    @Autowired
    OLTPServerService oltpService;
    @Autowired
    private PDHugeClientFactory pdHugeClientFactory;

    @GetMapping
    public Object queryPage(@PathVariable("graphspace") String graphspace,
                            @RequestParam(name = "query", required = false,
                                    defaultValue = "") String query,
                            @RequestParam(name = "page_no", required = false,
                                    defaultValue = "1") int pageNo,
                            @RequestParam(name = "page_size", required = false,
                                    defaultValue = "10") int pageSize) {
        try (HugeClient client = defaultClient(graphspace, null);){
            return oltpService.queryPage(client, query, pageNo, pageSize);
        } catch (Throwable t) {
            throw t;
        }
    }

    @GetMapping("{service}")
    public Object get(@PathVariable("graphspace") String graphspace,
                      @PathVariable("service") String service) {
        try (HugeClient client = defaultClient(graphspace, null);){
            return oltpService.get(client, service);
        } catch (Throwable t) {
            throw t;
        }
    }

    @PostMapping
    public Object create(@PathVariable("graphspace") String graphspace,
                         @RequestBody OLTPService serviceEntity) {

        // return serviceEntity;
        // TODO url or routetype
        if (serviceEntity.getDepleymentType()
                == OLTPService.DepleymentType.MANUAL) {
            serviceEntity.setRouteType(null);
        } else {
            serviceEntity.setRouteType("NodePort");
            serviceEntity.setUrls(null);
        }

        try (HugeClient client = defaultClient(graphspace, null);){
            return oltpService.create(client, serviceEntity);
        } catch (Throwable t) {
            throw t;
        }
    }

    @PutMapping("{service}")
    public Object update(@PathVariable("graphspace") String graphspace,
                         @PathVariable("service") String service,
                         @RequestBody OLTPService serviceEntity) {

        serviceEntity.setName(service);

        try (HugeClient client = defaultClient(graphspace, null);){
            return oltpService.update(client, serviceEntity);
        } catch (Throwable t) {
            throw t;
        }
    }

    @DeleteMapping("{service}")
    public void delete(@PathVariable("graphspace") String graphspace,
                       @PathVariable("service") String service) {
        if (("DEFAULT".equals(graphspace)) && ("DEFAULT".equals(service))) {
            throw new ParameterizedException("Do not delete the service " +
                                             "'DEFAULT' under the graphspace " +
                                             "named 'DEFAULT'!");
        }
        try (HugeClient client = defaultClient(graphspace, null);){
            oltpService.delete(client, service);
        } catch (Throwable t) {
            throw t;
        }
    }

    protected HugeClient defaultClient(String graphSpace, String graph) {
        // Get Service url From Default service
        List<String> urls =
                pdHugeClientFactory.getURLs(this.cluster,
                                            PDHugeClientFactory.DEFAULT_GRAPHSPACE,
                                            PDHugeClientFactory.DEFAULT_SERVICE);
        String url = urls.get((int) (Math.random() * urls.size()));

        if (CollectionUtils.isEmpty(urls)) {
            throw new ParameterizedException("No url in service(%s/%s)",
                                             PDHugeClientFactory.DEFAULT_GRAPHSPACE,
                                             PDHugeClientFactory.DEFAULT_SERVICE);
        }

        HugeClient client = hugeClientPoolService.create(url, graphSpace, graph,
                                                         this.getToken());

        return client;
    }
}
