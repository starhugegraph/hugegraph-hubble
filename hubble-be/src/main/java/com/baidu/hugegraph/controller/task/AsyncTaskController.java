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

package com.baidu.hugegraph.controller.task;

import java.util.List;

import com.baidu.hugegraph.driver.HugeClient;
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
import com.baidu.hugegraph.exception.ExternalException;
import com.baidu.hugegraph.service.algorithm.AsyncTaskService;
import com.baidu.hugegraph.structure.Task;
import com.baomidou.mybatisplus.core.metadata.IPage;

import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping(Constant.API_VERSION + "graphspaces/{graphspace}/graphs" +
        "/{graph}/async-tasks")
public class AsyncTaskController extends BaseController {

    private final AsyncTaskService service;

    @Autowired
    public AsyncTaskController(AsyncTaskService service) {
        this.service = service;
    }

    @GetMapping("{id}")
    public Task get(@PathVariable("graphspace") String graphSpace,
                    @PathVariable("graph") String graph,
                    @PathVariable("id") int id) {
        HugeClient client = this.authClient(graphSpace, graph);
        Task task = this.service.get(client, id);
        if (task == null) {
            throw new ExternalException("async.task.not-exist.id", id);
        }
        return task;
    }

    @PostMapping("cancel/{id}")
    public Task cancel(@PathVariable("graphspace") String graphSpace,
                       @PathVariable("graph") String graph,
                       @PathVariable("id") int id) {
        HugeClient client = this.authClient(graphSpace, graph);
        Task task = this.service.cancel(client, id);
        if (task == null) {
            throw new ExternalException("async.task.not-exist.id", id);
        }
        return task;
    }

    @GetMapping("ids")
    public List<Task> list(@PathVariable("graphspace") String graphSpace,
                           @PathVariable("graph") String graph,
                           @RequestParam("ids") List<Long> taskIds) {
        HugeClient client = this.authClient(graphSpace, graph);
        return this.service.list(client, taskIds);
    }

    @GetMapping
    public IPage<Task> list(@PathVariable("graphspace") String graphSpace,
                            @PathVariable("graph") String graph,
                            @RequestParam(name = "page_no",
                                          required = false,
                                          defaultValue = "1")
                                          int pageNo,
                            @RequestParam(name = "page_size",
                                          required = false,
                                          defaultValue = "10")
                                          int pageSize,
                            @RequestParam(name = "content",
                                          required = false,
                                          defaultValue = "")
                                          String content,
                            @RequestParam(name = "type",
                                          required = false,
                                          defaultValue = "")
                                          String type,
                            @RequestParam(name = "status",
                                          required = false,
                                          defaultValue = "")
                                          String status) {
        HugeClient client = this.authClient(graphSpace, graph);
        return this.service.list(client, pageNo, pageSize, content, type, status);
    }

    @DeleteMapping
    public void delete(@PathVariable("graphspace") String graphSpace,
                       @PathVariable("graph") String graph,
                       @RequestParam("ids") List<Integer> ids) {
        HugeClient client = this.authClient(graphSpace, graph);
        for (int id : ids) {
            Task task = this.service.get(client, id);
            if (task == null) {
                throw new ExternalException("async.task.not-exist.id", id);
            }
            this.service.remove(client, id);
        }
    }
}
