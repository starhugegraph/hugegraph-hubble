package com.baidu.hugegraph.config;

import com.baidu.hugegraph.options.HubbleOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.baidu.hugegraph.driver.factory.MetaHugeClientFactory;

@Configuration
public class MetaConfig {


    @Autowired
    private HugeConfig config;

    @Bean("cluster")
    public String getCluster() {
        return this.config.get(HubbleOptions.META_CLUSTER);
    }

    @Bean
    MetaHugeClientFactory hugeClientFactory() {
        String type = this.config.get(HubbleOptions.META_TYPE);
        String[] endpoints =
                this.config.get(HubbleOptions.META_ENDPOINTS).split(",");
        String ca = this.config.get(HubbleOptions.META_CA);
        String clientCa = this.config.get(HubbleOptions.META_CLIENT_CA);
        String clientKey = this.config.get(HubbleOptions.META_CLIENT_KEY);

        MetaHugeClientFactory.MetaDriverType metaType
                = MetaHugeClientFactory.MetaDriverType.valueOf(type.toUpperCase());

        return new MetaHugeClientFactory(metaType, endpoints, ca,
                                         clientCa, clientKey);
    }

}
