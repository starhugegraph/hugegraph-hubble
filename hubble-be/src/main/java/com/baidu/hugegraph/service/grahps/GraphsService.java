package com.baidu.hugegraph.service.grahps;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.baidu.hugegraph.loader.util.JsonUtil;
import com.baidu.hugegraph.structure.space.GraphSpace;
import com.baidu.hugegraph.util.PageUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.baidu.hugegraph.driver.HugeClient;

@Log4j2
@Service
public class GraphsService {

    public Map<String, String> get(HugeClient client, String graph) {
        return client.graphs().getGraph(graph);
    }

    public IPage<Map<String, String>> queryPage(HugeClient client, String query,
                                       int pageNo, int pageSize) {
        ArrayList<Map<String, String>> results = new ArrayList<>();
        client.graphs().listGraph().stream().filter((g) -> g.contains(query))
              .forEach((g) -> {
                  results.add(client.graphs().getGraph(g));
              });

        return PageUtil.page(results, pageNo, pageSize);
    }



    public Map<String, String> create(HugeClient client, String graph,
                                      boolean isAuth, String schemaTemplate) {
        Map<String, String> conf = new HashMap<>();
        if (isAuth) {
            conf.put("gremlin.graph",
                     "com.baidu.hugegraph.auth.HugeFactoryAuthProxy");

        } else {
            conf.put("gremlin.graph", "com.baidu.hugegraph.HugeFactory");
        }
        if (!StringUtils.isEmpty(schemaTemplate)) {
            conf.put("schema.init_template", schemaTemplate);
        }


        conf.put("store", graph);
        conf.put("backend", "rocksdb");
        conf.put("serializer", "binary");
        conf.put("rocksdb.data_path", "./" + graph);
        conf.put("rocksdb.waf_path", "./" + graph);

        return client.graphs().createGraph(graph, JsonUtil.toJson(conf));
    }

    public void truncate(HugeClient client, String graph,
                         boolean isClearSchema) {
        client.graphs().clear(graph, isClearSchema);
    }
}
