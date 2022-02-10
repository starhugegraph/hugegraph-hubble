/*
 *
 *  * Copyright 2017 HugeGraph Authors
 *  *
 *  * Licensed to the Apache Software Foundation (ASF) under one or more
 *  * contributor license agreements. See the NOTICE file distributed with this
 *  * work for additional information regarding copyright ownership. The ASF
 *  * licenses this file to You under the Apache License, Version 2.0 (the
 *  * "License"); you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *     http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  * License for the specific language governing permissions and limitations
 *  * under the License.
 *
 */

package com.baidu.hugegraph.service.op;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.FieldValue;
import co.elastic.clients.elasticsearch._types.query_dsl.MatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.RangeQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.TermsQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.TermsQueryField;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import co.elastic.clients.json.JsonData;
import com.baidu.hugegraph.entity.op.AuditEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

public class AuditService {

    @Autowired
    ElasticsearchClient esClient;

    protected final String indexName = "";

    public Object queryPage(AuditReq auditReq) throws IOException {

        List<AuditEntity> logs = new ArrayList<>();

        List<Query> querys = buildESQuery(auditReq);
        SearchResponse<Map> search = esClient.search((s) ->
            s.index(indexName).from(auditReq.pageNo).size(auditReq.pageSize)
             .query(q -> q.bool( boolQuery -> boolQuery.must(querys))
             ), Map.class);

        for (Hit<Map> hit: search.hits().hits()) {
            logs.add(AuditEntity.fromMap((Map<String, Object>) hit.source()));
        }

        return logs;
    }

    protected List<Query> buildESQuery(AuditReq auditReq) {
        List<Query> querys = new ArrayList<>();
        // start_datetime, end_datetime
        if (auditReq.startDatetime != null || auditReq.endDatetime != null) {
            Query.Builder builder = new Query.Builder();
            RangeQuery.Builder rBuilder = new RangeQuery.Builder();
            rBuilder = rBuilder.field("@timestamp");
            if (auditReq.startDatetime != null) {
                rBuilder = rBuilder.gte(JsonData.of(auditReq.startDatetime));
            }
            if (auditReq.endDatetime != null) {
                rBuilder = rBuilder.lte(JsonData.of(auditReq.endDatetime));
            }
            querys.add(builder.range(rBuilder.build()).build());
        }

        // graphspace
        if (!StringUtils.isEmpty(auditReq.graphSpace)) {
            Query.Builder builder = new Query.Builder();

            MatchQuery.Builder mBuilder = new MatchQuery.Builder();
            mBuilder.field("message").query(FieldValue.of(auditReq.graphSpace));

            querys.add(builder.match(mBuilder.build()).build());
        }

        // graph
        if (!StringUtils.isEmpty(auditReq.graph)) {
            Query.Builder builder = new Query.Builder();

            MatchQuery.Builder mBuilder = new MatchQuery.Builder();
            mBuilder.field("message").query(FieldValue.of(auditReq.graph));

            querys.add(builder.match(mBuilder.build()).build());
        }

        // user
        if (!StringUtils.isEmpty(auditReq.user)) {
            Query.Builder builder = new Query.Builder();

            MatchQuery.Builder mBuilder = new MatchQuery.Builder();
            mBuilder.field("message").query(FieldValue.of(auditReq.user));

            querys.add(builder.match(mBuilder.build()).build());
        }

        // ip
        if (!StringUtils.isEmpty(auditReq.ip)) {
            Query.Builder builder = new Query.Builder();

            MatchQuery.Builder mBuilder = new MatchQuery.Builder();
            mBuilder.field("message").query(FieldValue.of(auditReq.ip));

            querys.add(builder.match(mBuilder.build()).build());
        }
        // services
        if (auditReq.services.size() > 0) {
            Query.Builder builder = new Query.Builder();

            TermsQuery.Builder tBuilder = new TermsQuery.Builder();
            TermsQueryField.Builder fieldBuilder = new TermsQueryField.Builder();
            fieldBuilder.value(auditReq.services.stream().map(FieldValue::of)
                                              .collect(Collectors.toList()));
            tBuilder.field("fields.source.keyword").terms(fieldBuilder.build());

            querys.add(builder.terms(tBuilder.build()).build());
        }

        // operations
        if (auditReq.operations.size() > 0) {
            Query.Builder builder = new Query.Builder();

            TermsQuery.Builder tBuilder = new TermsQuery.Builder();
            TermsQueryField.Builder fieldBuilder = new TermsQueryField.Builder();
            fieldBuilder.value(auditReq.operations.stream().map(FieldValue::of)
                                                .collect(Collectors.toList()));
            tBuilder.field("fields.source.keyword").terms(fieldBuilder.build());

            querys.add(builder.terms(tBuilder.build()).build());
        }

        return querys;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class AuditReq {
        @JsonProperty("start_datetime")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd "
                + "HH:mm:ss", timezone = "GMT+8")
        public Date startDatetime;

        @JsonProperty("end_datetime")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd " +
                "HH:mm:ss", timezone = "GMT+8")
        public Date endDatetime;

        @JsonProperty("user")
        public String user;
        @JsonProperty("ip")
        public String ip;
        @JsonProperty("operations")
        public List<String> operations;
        @JsonProperty("services")
        public List<String> services;
        @JsonProperty("graphspace")
        public String graphSpace;
        @JsonProperty("graph")
        public String graph;
        @JsonProperty("page_no")
        public int pageNo = 1;
        @JsonProperty("page_size")
        public int pageSize = 20;
    }
}
