package com.baidu.hugegraph.service.op;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import com.baidu.hugegraph.config.HugeConfig;
import com.baidu.hugegraph.options.HubbleOptions;
import com.baidu.hugegraph.util.E;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.Objects;

@Log4j2
public abstract class ESService {
    @Autowired
    private HugeConfig config;

    public static final String[] LEVELS = new String[]{"TRACE", "OFF",
            "FATAL", "ERROR", "WARN", "INFO", "DEBUG"};

    public ElasticsearchClient esClient() {

        RestClient restClient = esRestClient();

        // Create the transport with a Jackson mapper
        ElasticsearchTransport transport = new RestClientTransport(
                restClient, new JacksonJsonpMapper());
        // And create the API client
        ElasticsearchClient client = new ElasticsearchClient(transport);

        return client;
    }

    public RestClient esRestClient() {
        String esURLS = config.get(HubbleOptions.ES_URL);

        E.checkArgument(StringUtils.isNotEmpty(esURLS), "Create elasticsearch" +
                " client error. Please config es.urls in hugegraph-hubble" +
                ".properties ");

        String[] esAddresses = esURLS.split(",");
        HttpHost[] hosts = Arrays.stream(esAddresses)
                                 .map(HttpHost::create)
                                 .filter(Objects::nonNull)
                                 .toArray(HttpHost[]::new);
        log.debug("es.hosts:{}", Arrays.toString(hosts));

        RestClient restClient = RestClient.builder(hosts).build();

        return restClient;
    }
}
