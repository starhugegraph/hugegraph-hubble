package com.baidu.hugegraph.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.baidu.hugegraph.driver.factory.MetaHugeClientFactory;

@Configuration
@ConfigurationProperties(prefix = "meta")
public class MetaConfig {

    String cluster;

    MetaHugeClientFactory.MetaDriverType type;

    String[] endpoints;

    public void setType(MetaHugeClientFactory.MetaDriverType type) {
        this.type = type;
    }

    public void setEndpoints(String[] endpoints) {
        this.endpoints = endpoints;
    }

    public void setCluster(String cluster) {
        this.cluster = cluster;
    }

    @Bean("cluster")
    public String getCluster() {
        return this.cluster;
    }

    @Bean
    MetaHugeClientFactory hugeClientFactory() {
        return new MetaHugeClientFactory(type, endpoints);
    }

}
