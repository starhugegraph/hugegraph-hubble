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

package com.baidu.hugegraph.service.op;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.FieldValue;
import co.elastic.clients.elasticsearch._types.aggregations.Aggregation;
import co.elastic.clients.elasticsearch._types.aggregations.Buckets;
import co.elastic.clients.elasticsearch._types.aggregations.StringTermsBucket;
import co.elastic.clients.elasticsearch._types.query_dsl.MatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.RangeQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.TermsQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.TermsQueryField;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import co.elastic.clients.json.JsonData;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baidu.hugegraph.entity.op.LogEntity;

@Service
public class LogService {
    @Autowired
    ElasticsearchClient esClient;

    protected final String indexName = "pdlogs-hugegraph-store1-*";

    protected final String[] logLevels = new String[]{"TRACE", "OFF", "FATAL"
            , "ERROR", "WARN", "INFO", "DEBUG","ALL"};

    public List<LogEntity> queryPage(LogReq logReq) throws IOException {
        // TODO Query Check

        List<LogEntity> logs = new ArrayList<>();

        List<Query> querys = new ArrayList<>();

        // start_datetime, end_datetime
        if(logReq.startDatetime != null || logReq.endDatetime != null) {
            Query.Builder builder = new Query.Builder();
            // builder.range(e->e.field())
            RangeQuery.Builder rBuilder = new RangeQuery.Builder();
            rBuilder = rBuilder.field("@timestamp");
            if(logReq.startDatetime != null) {
                rBuilder = rBuilder.gte(JsonData.of(logReq.startDatetime));
            }
            if(logReq.endDatetime != null) {
                rBuilder = rBuilder.lte(JsonData.of(logReq.endDatetime));
            }
            querys.add(builder.range(rBuilder.build()).build());
        }

        // query
        if(!StringUtils.isEmpty(logReq.query)) {
            Query.Builder builder = new Query.Builder();

            MatchQuery.Builder mBuilder = new MatchQuery.Builder();
            mBuilder.field("message").query(FieldValue.of(logReq.query));

            querys.add(builder.match(mBuilder.build()).build());
        }

        // services
        if (logReq.services.size() > 0) {
            Query.Builder builder = new Query.Builder();

            TermsQuery.Builder tBuilder = new TermsQuery.Builder();
            TermsQueryField.Builder fieldBuilder = new TermsQueryField.Builder();
            fieldBuilder.value(logReq.services.stream().map(FieldValue::of)
                                              .collect(Collectors.toList()));
            tBuilder.field("fields.source.keyword").terms(fieldBuilder.build());

            querys.add(builder.terms(tBuilder.build()).build());
        }

        // hosts
        if (logReq.hosts.size() > 0) {
            Query.Builder builder = new Query.Builder();

            TermsQuery.Builder tBuilder = new TermsQuery.Builder();
            TermsQueryField.Builder fieldBuilder = new TermsQueryField.Builder();
            fieldBuilder.value(logReq.hosts.stream().map(FieldValue::of)
                                              .collect(Collectors.toList()));
            tBuilder.field("host.hostname.keyword").terms(fieldBuilder.build());

            querys.add(builder.terms(tBuilder.build()).build());
        }

        // Level
        if (StringUtils.isNotEmpty(logReq.level)) {
            int levelIndex = ArrayUtils.indexOf(logLevels,
                                                logReq.level.toUpperCase());

            String[] retianLevels = Arrays.copyOfRange(logLevels, 0,
                                                       levelIndex);

            Query.Builder builder = new Query.Builder();

            TermsQuery.Builder tBuilder = new TermsQuery.Builder();
            TermsQueryField.Builder fieldBuilder = new TermsQueryField.Builder();
            fieldBuilder.value(Arrays.stream(retianLevels).map(FieldValue::of)
                                     .collect(Collectors.toList()));
            tBuilder.field("level").terms(fieldBuilder.build());

            querys.add(builder.terms(tBuilder.build()).build());
        }


        // TODO
        SearchResponse<Map> search = esClient.search((s) ->
            s.index(indexName).from(logReq.pageNo).size(logReq.pageSize)
             .query(q -> q.bool( boolQuery ->
                        boolQuery.must(querys)
                    )
             ), Map.class);

        for (Hit<Map> hit: search.hits().hits()) {
            logs.add(LogEntity.fromMap((Map<String, Object>) hit.source()));
            // logs.add(hit.source());
        }

        return logs;
    }

    public List<String> listServices() throws IOException {
        List<String> hosts = new ArrayList<>();

        final String serviceField = "fields.source.keyword";

        return esAggTerms(serviceField, 20);
    }

    public List<String> listHosts() throws IOException {

        List<String> hosts = new ArrayList<>();

        final String hostField = "host.hostname.keyword";

        return esAggTerms(hostField, 20);
    }

    protected List<String> esAggTerms(String field, int top) throws IOException {
        String key = "field_key";
        Aggregation agg = Aggregation.of(
                a -> a.terms(v -> v.field(field).size(top)));

        // DO Request
        SearchResponse<Object> response
                = esClient.search((s) -> s.index(indexName)
                                          .aggregations(key, agg),
                                  Object.class);

        // Get agg terms from response
        Buckets<StringTermsBucket> buckets = response.aggregations()
                                                     .get(key)
                                                     .sterms()
                                                     .buckets();

        return buckets.array().stream().map(b -> b.key())
                      .collect(Collectors.toList());

    }

    @NoArgsConstructor
    @AllArgsConstructor
    public static class LogReq {
        @JsonProperty("start_datetime")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd "
                + "HH:mm:ss", timezone = "GMT+8")
        public Date startDatetime;

        @JsonProperty("end_datetime")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd " +
                "HH:mm:ss", timezone = "GMT+8")
        public Date endDatetime;

        @JsonProperty("query")
        public String query;

        @JsonProperty("level")
        public String level;

        @JsonProperty("services")
        public List<String> services = new ArrayList<>();

        @JsonProperty("hosts")
        public List<String> hosts = new ArrayList<>();

        @JsonProperty("page_no")
        public int pageNo = 1;

        @JsonProperty("page_size")
        public int pageSize = 20;
    }
}
