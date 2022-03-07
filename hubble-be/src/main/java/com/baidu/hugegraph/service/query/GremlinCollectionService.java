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

package com.baidu.hugegraph.service.query;

import com.google.common.collect.ImmutableMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.entity.query.GremlinCollection;
import com.baidu.hugegraph.exception.InternalException;
import com.baidu.hugegraph.mapper.query.GremlinCollectionMapper;
import com.baidu.hugegraph.util.SQLUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

@Service
public class GremlinCollectionService {

    @Autowired
    private GremlinCollectionMapper mapper;

    public IPage<GremlinCollection> list(HugeClient client, String content,
                                         Boolean nameOrderAsc,
                                         Boolean timeOrderAsc,
                                         long current, long pageSize) {
        QueryWrapper<GremlinCollection> query = Wrappers.query();
        String graphSpace = client.getGraphSpaceName();
        String graph = client.getGraphName();
        IPage<GremlinCollection> page = new Page<>(current, pageSize);
        if (!StringUtils.isEmpty(content)) {
            // Select by content
            String value = SQLUtil.escapeLike(content);
            if (nameOrderAsc != null) {
                // order by name
                assert timeOrderAsc == null;
                query.eq("graphspace", graphSpace)
                     .eq("graph", graph).and(wrapper -> {
                         wrapper.like("name", value).or()
                                .like("content", value);
                     });
                query.orderBy(true, nameOrderAsc, "name");
                return this.mapper.selectPage(page, query);
            } else if (timeOrderAsc != null) {
                // order by time
                assert nameOrderAsc == null;
                query.eq("graphspace", graphSpace)
                     .eq("graph", graph).and(wrapper -> {
                         wrapper.like("name", value).or()
                                .like("content", value);
                });
                query.orderBy(true, timeOrderAsc, "create_time");
                return this.mapper.selectPage(page, query);
            } else {
                // order by relativity
                assert nameOrderAsc == null && timeOrderAsc == null;
                return this.mapper.selectByContentInPage(page, graphSpace, graph ,
                                                         content);
            }
        } else {
            // Select all
            if (nameOrderAsc != null) {
                // order by name
                assert timeOrderAsc == null;
                query.eq("graphspace", graphSpace)
                     .eq("graph", graph)
                     .orderBy(true, nameOrderAsc, "name");
                return this.mapper.selectPage(page, query);
            } else {
                // order by time
                boolean isAsc = timeOrderAsc != null && timeOrderAsc;
                query.eq("graphspace", graphSpace)
                     .eq("graph", graph)
                     .orderBy(true, isAsc, "create_time");
                return this.mapper.selectPage(page, query);
            }
        }
    }

    public GremlinCollection get(int id) {
        return this.mapper.selectById(id);
    }

    public GremlinCollection getByName(String graphSpace, String graph,
                                       String name) {
        QueryWrapper<GremlinCollection> query = Wrappers.query();
        query.eq("graphspace", graphSpace);
        query.eq("graph", graph);
        query.eq("name", name);
        return this.mapper.selectOne(query);
    }

    public int count() {
        return this.mapper.selectCount(null);
    }

    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void save(GremlinCollection collection) {
        if (this.mapper.insert(collection) != 1) {
            throw new InternalException("entity.insert.failed", collection);
        }
    }

    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void update(GremlinCollection collection) {
        if (this.mapper.updateById(collection) != 1) {
            throw new InternalException("entity.update.failed", collection);
        }
    }

    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void remove(int id) {
        if (this.mapper.deleteById(id) != 1) {
            throw new InternalException("entity.delete.failed", id);
        }
    }

    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void deleteByGraph(String graphSpace, String graph) {
        this.mapper.deleteByMap(ImmutableMap.of("graphspace", graphSpace,
                                                "graph", graph));
    }
}
