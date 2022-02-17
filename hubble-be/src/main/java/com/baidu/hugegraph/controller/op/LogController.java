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

package com.baidu.hugegraph.controller.op;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.google.common.collect.ImmutableMap;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baidu.hugegraph.common.Constant;
import com.baidu.hugegraph.controller.BaseController;
import com.baidu.hugegraph.service.op.LogService;
import com.baidu.hugegraph.entity.op.LogEntity;
import com.baidu.hugegraph.exception.InternalException;
import com.baidu.hugegraph.util.JsonUtil;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping(Constant.API_VERSION + "logs")
public class LogController extends BaseController {
    @Autowired
    LogService logService;

    @SneakyThrows
    @GetMapping("services/list")
    public Object listServices() {
        List<String> services = logService.listServices();

        return ImmutableMap.of("services", services);
    }

    @SneakyThrows
    @GetMapping("hosts/list")
    public Object listHosts() {
        List<String> hosts = logService.listHosts();

        return ImmutableMap.of("hosts", hosts);
    }

    @SneakyThrows
    @PostMapping("query")
    public IPage<LogEntity> query(@RequestBody LogService.LogReq logReq) {
        logReq.level = "";
        return logService.queryPage(logReq);
    }

    @SneakyThrows
    @PostMapping("export")
    public void export(HttpServletResponse response,
                       @RequestBody LogService.LogReq logReq) {
        String fileName = String.format("log.txt", logReq.startDatetime,
                                        logReq.endDatetime);

        logReq.level = "";
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/octet-stream");
        response.setHeader("Access-Control-Expose-Headers",
                           "Content-Disposition");
        response.setHeader("Content-Disposition",
                           "attachment;filename=" + fileName);
        try {
            OutputStream os = response.getOutputStream();
            for(LogEntity logEntity : logService.export(logReq)) {
                os.write((logEntity.getMessage() + "\n")
                                 .getBytes(StandardCharsets.UTF_8));
            }
            os.close();
        } catch (IOException e) {
            throw new InternalException("Log Write Error", e);
        }
    }
}
