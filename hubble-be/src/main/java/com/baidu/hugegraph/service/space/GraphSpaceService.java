package com.baidu.hugegraph.service.space;

import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.exception.InternalException;
import com.baidu.hugegraph.structure.space.GraphSpace;
import org.springframework.stereotype.Service;
import com.baomidou.mybatisplus.core.metadata.IPage;

import com.baidu.hugegraph.util.PageUtil;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GraphSpaceService {
    public IPage<GraphSpace> list(HugeClient client, int pageNo,
                                  int pageSize) {
        List<GraphSpace> results = client.graphSpace().listGraphSpace();

        return PageUtil.page(results, pageNo, pageSize);
    }

    public IPage<GraphSpace> queryPage(HugeClient client, String query,
                                       int pageNo, int pageSize) {
        List<GraphSpace> results =
                client.graphSpace().listGraphSpace().stream()
                      .filter((s) -> s.getName().contains(query))
                      .sorted(Comparator.comparing(GraphSpace::getName))
                      .collect(Collectors.toList());

        return PageUtil.page(results, pageNo, pageSize);
    }

    public GraphSpace get(HugeClient authClient, String graphspace) {
        GraphSpace space = authClient.graphSpace().getGraphSpace(graphspace);
        if (space == null) {
            throw new InternalException("graphspace.get.{} Not Exits",
                                        graphspace);
        }
        return space;
    }

    public void delete(HugeClient authClient, String graphspace) {
        authClient.graphSpace().deleteGraphSpace(graphspace);
    }

    public void create(HugeClient authClient, GraphSpace graphSpace) {
        authClient.graphSpace().createGraphSpace(graphSpace);
    }

    public GraphSpace update(HugeClient authClient, GraphSpace graphSpace) {
        return authClient.graphSpace().updateGraphSpace(graphSpace);
    }
}
