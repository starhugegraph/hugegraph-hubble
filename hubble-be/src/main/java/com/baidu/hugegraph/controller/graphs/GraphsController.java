package com.baidu.hugegraph.controller.graphs;

import com.baidu.hugegraph.service.grahps.GraphsService;
import com.baidu.hugegraph.util.PageUtil;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.ImmutableSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baidu.hugegraph.common.Constant;
import com.baidu.hugegraph.controller.BaseController;
import com.baidu.hugegraph.entity.graphs.GraphEntity;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(Constant.API_VERSION + "graphspaces/{graphspace}/graphs")
public class GraphsController extends BaseController {

    @Autowired
    GraphsService graphsService;

    @GetMapping("list")
    public Object listNames(@PathVariable("graphspace") String graphspace) {
        // TODO GraphEntity
        ImmutableSet<GraphEntity> graphs = this.clientService.listAllGraphs();

        List<String> names =
                graphs.stream().map((graphEntity -> graphEntity.getGraph()))
                      .collect(Collectors.toList());

        return ImmutableMap.of("graphs", names);
    }

    @GetMapping
    public Object queryPage(@PathVariable("graphspace") String graphspace,
                            @RequestParam(name = "query", required = false,
                                    defaultValue = "") String query,
                            @RequestParam(name = "page_no", required = false,
                                    defaultValue = "1") int pageNo,
                            @RequestParam(name = "page_size", required = false,
                                    defaultValue = "10") int pageSize) {
        return this.graphsService.queryPage(this.authClient(graphspace, null)
                , query, pageNo, pageSize);
    }

    @GetMapping("{graph}")
    public Object list(@PathVariable("graphspace") String graphspace,
                       @PathVariable("graph") String graph) {
        return graphsService.get(this.authClient(graphspace, graph), graph);
    }

    @PostMapping
    public Object create(@PathVariable("graphspace") String graphspace,
                         @RequestParam("graph") String graph,
                         @RequestParam(value = "auth", required = false,
                                 defaultValue = "false") boolean isAuth,
                         @RequestParam(value = "schema", required = false)
                                 String schema) {
        return this.graphsService.create(this.authClient(graphspace, null),
                                         graph, isAuth, schema);
    }


    @GetMapping("{graph}/truncate")
    public void truncate(@PathVariable("graphspace") String graphspace,
                           @PathVariable("graph") String graph,
                           @RequestParam(value = "clear_schema", required =
                                   false, defaultValue = "true") boolean isClearSchema) {
        this.graphsService.truncate(this.authClient(graphspace, graph), graph,
                                    isClearSchema);
    }
}
