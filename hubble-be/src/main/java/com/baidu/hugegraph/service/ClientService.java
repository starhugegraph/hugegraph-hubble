package com.baidu.hugegraph.service;

import java.util.HashSet;
import java.util.Set;

import com.baidu.hugegraph.driver.factory.DefaultHugeClientFactory;
import com.baidu.hugegraph.structure.auth.Login;
import com.baidu.hugegraph.structure.auth.LoginResult;
import com.google.common.collect.ImmutableSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baidu.hugegraph.entity.graphs.GraphEntity;
import com.baidu.hugegraph.driver.factory.MetaHugeClientFactory;
import com.baidu.hugegraph.driver.HugeClient;

@Service
public class ClientService {
    @Autowired
    protected String cluster;

    @Autowired
    protected MetaHugeClientFactory hugeClientFactory;

    public HugeClient createUnauthClient() {
        // Get all graphspace under cluster
        return hugeClientFactory.createUnauthClient(this.cluster, null, null);
    }

    public HugeClient createAuthClient(String graphSpace,
                                       String graph, String token) {
        return hugeClientFactory.createAuthClient(this.cluster, graphSpace,
                                                  graph, token);
    }

    public ImmutableSet<GraphEntity> listAllGraphs() {

        Set<GraphEntity> graphs = new HashSet<>();

        Set<String> spaces =
                this.hugeClientFactory.listGraphSpaces(this.cluster);

        for(String space: spaces) {
            this.hugeClientFactory
                    .listGraphs(this.cluster, space)
                    .forEach((g) -> {
                        graphs.add(new GraphEntity(cluster, space, g));
                    });

        }
        return ImmutableSet.copyOf(graphs);
    }





    public ImmutableSet<String> listAllGraphSpaces() {

        Set<String> graphSpaces = new HashSet<>();

        this.hugeClientFactory.listGraphSpaces(this.cluster).forEach((p) -> {
            graphSpaces.add(p);
        });

        return ImmutableSet.copyOf(graphSpaces);
    }
}
