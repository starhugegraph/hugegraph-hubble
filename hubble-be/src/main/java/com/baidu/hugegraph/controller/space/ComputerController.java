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

import com.baidu.hugegraph.common.Constant;
import com.baidu.hugegraph.controller.BaseController;
import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.service.space.ComputerService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Constant.API_VERSION + "graphspaces/{graphspace}/graphs" +
        "/{graph}/services/computer")
public class ComputerController extends BaseController {

    @Autowired
    ComputerService computerService;

    @GetMapping
    public IPage queryPage(@PathVariable("graphspace") String graphspace,
                           @PathVariable("graph") String graph,
                           @RequestParam(name = "query", required = false,
                                   defaultValue = "") String query,
                           @RequestParam(name = "page_no", required = false,
                                   defaultValue = "1") int pageNo,
                           @RequestParam(name = "page_size", required = false,
                                   defaultValue = "10") int pageSize) {
        HugeClient client = this.authClient(graphspace, graph);
        return computerService.queryPgae(client, query, pageNo, pageSize);
    }

    @GetMapping("{id}/cancel")
    public void cancel(@PathVariable("graphspace") String graphspace,
                       @PathVariable("graph") String graph,
                       @PathVariable("id") long id) {

        HugeClient client = this.authClient(graphspace, graph);
        computerService.cancel(client, id);
    }
}
