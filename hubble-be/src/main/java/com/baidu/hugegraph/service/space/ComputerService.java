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

import java.util.ArrayList;

import com.baomidou.mybatisplus.core.metadata.IPage;
import org.springframework.stereotype.Service;

import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.entity.space.ComputerServiceEntity;
import com.baidu.hugegraph.structure.Task;
import com.baidu.hugegraph.util.PageUtil;

@Service
public class ComputerService {
    public IPage<ComputerServiceEntity> queryPage(HugeClient client,
                                                  String query,
                                                  int pageNo,
                                                  int pageSize) {
        ArrayList results = new ArrayList<ComputerService>();
        client.computer().list(pageSize).forEach((t) -> {
            ComputerServiceEntity entity = convert(t);
            entity.setGraphSpace(client.getGraphSpaceName());
            entity.setGraph(client.getGraphName());
            results.add(entity);
        });

        // TODO: get job count
        int count = 0;

        return PageUtil.newPage(results, pageNo, pageSize, count);
    }

    public ComputerServiceEntity get(HugeClient client, long id) {
        return convert(client.computer().get(id));
    }

    public void cancel(HugeClient client, long id) {
        client.computer().cancel(id);
    }

    protected ComputerServiceEntity convert(Task task) {
        ComputerServiceEntity entity = new ComputerServiceEntity();
        entity.setId(task.id());
        entity.setName(task.name());
        entity.setType(task.type());
        entity.setDescription(task.description());
        entity.setCreate(task.createTime());


        return entity;
    }

    public void delete(HugeClient client, long id) {
        client.computer().delete(id);
    }
}
