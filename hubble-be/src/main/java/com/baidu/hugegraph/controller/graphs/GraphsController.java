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

package com.baidu.hugegraph.controller.graphs;

import java.util.List;
import java.util.stream.Collectors;

import com.google.common.collect.ImmutableMap;
import com.google.common.collect.ImmutableSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baidu.hugegraph.common.Constant;
import com.baidu.hugegraph.controller.BaseController;
import com.baidu.hugegraph.entity.graphs.GraphEntity;
import com.baidu.hugegraph.service.grahps.GraphsService;

@RestController
@RequestMapping(Constant.API_VERSION + "graphspaces/{graphspace}/graphs")
public class GraphsController extends BaseController {

    @Autowired
    GraphsService graphsService;

    @GetMapping("list")
    public Object listNames(@PathVariable("graphspace") String graphspace) {
        // GraphEntity
        ImmutableSet<GraphEntity> graphs = this.clientService.listAllGraphs();

        List<String> names =
                graphs.stream().map((graphEntity -> graphEntity.getGraph()))
                      .collect(Collectors.toList());

        return ImmutableMap.of("graphs", names);
    }

    @GetMapping
    public Object queryPage(@PathVariable("graphspace") String graphspace,
                            @RequestParam(name = "query", required = false,
                                    defaultValue = "") String query,
                            @RequestParam(name = "page_no", required = false,
                                    defaultValue = "1") int pageNo,
                            @RequestParam(name = "page_size", required = false,
                                    defaultValue = "10") int pageSize) {
        return this.graphsService.queryPage(this.authClient(graphspace, null)
                , query, pageNo, pageSize);
    }

    @GetMapping("{graph}")
    public Object list(@PathVariable("graphspace") String graphspace,
                       @PathVariable("graph") String graph) {
        return graphsService.get(this.authClient(graphspace, graph), graph);
    }

    @PostMapping
    public Object create(@PathVariable("graphspace") String graphspace,
                         @RequestParam("graph") String graph,
                         @RequestParam(value = "auth", required = false,
                                 defaultValue = "false") boolean isAuth,
                         @RequestParam(value = "schema", required = false)
                                 String schema) {
        return this.graphsService.create(this.authClient(graphspace, null),
                                         graph, isAuth, schema);
    }

    @DeleteMapping("{graph}")
    public void delete(@PathVariable("graphspace") String graphspace,
                       @PathVariable("graph") String graph,
                       @RequestParam("message") String message) {

        this.graphsService.delete(this.authClient(graphspace, graph), graph,
                                  message);
    }


    @GetMapping("{graph}/truncate")
    public void truncate(@PathVariable("graphspace") String graphspace,
                         @PathVariable("graph") String graph,
                         @RequestParam(value = "clear_schema", required =
                                 false, defaultValue = "true") boolean isClearSchema) {
        this.graphsService.truncate(this.authClient(graphspace, graph), graph,
                                    isClearSchema);
    }
}
