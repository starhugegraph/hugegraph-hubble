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

package com.baidu.hugegraph.controller.graph;

import java.util.Map;
import java.util.Set;

import com.baidu.hugegraph.driver.HugeClient;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriUtils;

import com.baidu.hugegraph.common.Constant;
import com.baidu.hugegraph.controller.BaseController;
import com.baidu.hugegraph.entity.graph.EdgeEntity;
import com.baidu.hugegraph.entity.graph.VertexEntity;
import com.baidu.hugegraph.entity.query.GraphView;
import com.baidu.hugegraph.entity.schema.EdgeLabelEntity;
import com.baidu.hugegraph.entity.schema.VertexLabelEntity;
import com.baidu.hugegraph.service.graph.GraphService;
import com.baidu.hugegraph.service.schema.EdgeLabelService;
import com.baidu.hugegraph.service.schema.VertexLabelService;
import com.baidu.hugegraph.structure.constant.IdStrategy;
import com.baidu.hugegraph.structure.graph.Edge;
import com.baidu.hugegraph.structure.graph.Vertex;
import com.baidu.hugegraph.util.Ex;

@RestController
@RequestMapping(Constant.API_VERSION + "graphspaces/{graphspace}/graphs" +
        "/{graph}")
public class GraphController extends BaseController {

    @Autowired
    private VertexLabelService vlService;
    @Autowired
    private EdgeLabelService elService;
    @Autowired
    private GraphService graphService;

    @PostMapping("vertex")
    public GraphView addVertex(@PathVariable("graphspace") String graphSpace,
                               @PathVariable("graph") String graph,
                               @RequestBody VertexEntity entity) {
        HugeClient client = this.authClient(graphSpace, graph);
        this.checkParamsValid(client, entity, true);
        return this.graphService.addVertex(client, entity);
    }

    @PutMapping("vertex/{id}")
    public Vertex updateVertex(@PathVariable("graphspace") String graphSpace,
                               @PathVariable("graph") String graph,
                               @PathVariable("id") String vertexId,
                               @RequestBody VertexEntity entity) {
        HugeClient client = this.authClient(graphSpace, graph);
        vertexId = UriUtils.decode(vertexId, Constant.CHARSET);
        this.checkParamsValid(client, entity, false);
        this.checkIdSameAsBody(vertexId, entity);
        return this.graphService.updateVertex(client, entity);
    }

    @PostMapping("edge")
    public GraphView addEdge(@PathVariable("graphspace") String graphSpace,
                             @PathVariable("graph") String graph,
                             @RequestBody EdgeEntity entity) {
        HugeClient client = this.authClient(graphSpace, graph);
        this.checkParamsValid(client, entity, true);
        return this.graphService.addEdge(client, entity);
    }

    @PutMapping("edge/{id}")
    public Edge updateEdge(@PathVariable("graphspace") String graphSpace,
                           @PathVariable("graph") String graph,
                           @PathVariable("id") String edgeId,
                           @RequestBody EdgeEntity entity) {
        edgeId = UriUtils.decode(edgeId, Constant.CHARSET);
        HugeClient client = this.authClient(graphSpace, graph);
        this.checkParamsValid(client, entity, false);
        this.checkIdSameAsBody(edgeId, entity);
        return this.graphService.updateEdge(client, entity);
    }

    private void checkParamsValid(HugeClient client, VertexEntity entity,
                                  boolean create) {
        Ex.check(!StringUtils.isEmpty(entity.getLabel()),
                 "common.param.cannot-be-null-or-empty", "label");
        // If schema doesn't exist, it will throw exception
        VertexLabelEntity vlEntity = this.vlService.get(entity.getLabel(),
                                                        client);
        IdStrategy idStrategy = vlEntity.getIdStrategy();
        if (create) {
            Ex.check(idStrategy.isCustomize(), () -> entity.getId() != null,
                     "common.param.cannot-be-null", "id");
        } else {
            Ex.check(entity.getId() != null,
                     "common.param.cannot-be-null", "id");
        }

        Set<String> nonNullableProps = vlEntity.getNonNullableProps();
        Map<String, Object> properties = entity.getProperties();
        Ex.check(properties.keySet().containsAll(nonNullableProps),
                 "graph.vertex.all-nonnullable-prop.should-be-setted");
    }

    private void checkParamsValid(HugeClient client, EdgeEntity entity,
                                  boolean create) {
        Ex.check(!StringUtils.isEmpty(entity.getLabel()),
                 "common.param.cannot-be-null-or-empty", "label");
        // If schema doesn't exist, it will throw exception
        EdgeLabelEntity elEntity = this.elService.get(entity.getLabel(), client);
        if (create) {
            Ex.check(entity.getId() == null,
                     "common.param.must-be-null", "id");
        } else {
            Ex.check(entity.getId() != null,
                     "common.param.cannot-be-null", "id");
        }
        Ex.check(entity.getSourceId() != null,
                 "common.param.must-be-null", "source_id");
        Ex.check(entity.getTargetId() != null,
                 "common.param.must-be-null", "target_id");

        Set<String> nonNullableProps = elEntity.getNonNullableProps();
        Map<String, Object> properties = entity.getProperties();
        Ex.check(properties.keySet().containsAll(nonNullableProps),
                 "graph.edge.all-nonnullable-prop.should-be-setted");
    }
}
