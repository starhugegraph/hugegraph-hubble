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

package com.baidu.hugegraph.controller.query;

import com.baidu.hugegraph.driver.HugeClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baidu.hugegraph.common.Constant;
import com.baidu.hugegraph.entity.query.ExecuteHistory;
import com.baidu.hugegraph.exception.ExternalException;
import com.baidu.hugegraph.service.query.ExecuteHistoryService;
import com.baomidou.mybatisplus.core.metadata.IPage;

@RestController
@RequestMapping(Constant.API_VERSION + "graphspaces/{graphspace}/graphs" +
        "/{graph}/execute-histories")
public class ExecuteHistoryController extends GremlinController {

    @Autowired
    private ExecuteHistoryService service;

    @GetMapping
    public IPage<ExecuteHistory> list(@PathVariable("graphspace") String graphSpace,
                                      @PathVariable("graph") String graph,
                                      @RequestParam(name = "page_no",
                                                    required = false,
                                                    defaultValue = "1")
                                      int pageNo,
                                      @RequestParam(name = "page_size",
                                                    required = false,
                                                    defaultValue = "10")
                                      int pageSize) {
        HugeClient client = this.authClient(graphSpace, graph);
        return this.service.list(client, pageNo, pageSize);
    }

    @GetMapping("{id}")
    public ExecuteHistory get(@PathVariable("graphspace") String graphSpace,
                              @PathVariable("graph") String graph,
                              @PathVariable("id") int id) {
        HugeClient client = this.authClient(graphSpace, graph);
        return this.service.get(client, id);
    }

    @DeleteMapping("{id}")
    public ExecuteHistory delete(@PathVariable("graphspace") String graphSpace,
                                 @PathVariable("graph") String graph,
                                 @PathVariable("id") int id) {
        HugeClient client = this.authClient(graphSpace, graph);
        ExecuteHistory oldEntity = this.service.get(client, id);
        if (oldEntity == null) {
            throw new ExternalException("execute-history.not-exist.id", id);
        }
        this.service.remove(client, id);
        return oldEntity;
    }
}
