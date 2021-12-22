package com.baidu.hugegraph.controller.space;

import com.google.common.collect.ImmutableMap;
import com.google.common.collect.ImmutableSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baidu.hugegraph.service.space.GraphSpaceService;
import com.baidu.hugegraph.structure.space.GraphSpace;
import com.baidu.hugegraph.common.Constant;
import com.baidu.hugegraph.controller.BaseController;

@RestController
@RequestMapping(Constant.API_VERSION + "graphspaces")
public class GraphSpaceController extends BaseController {

    @Autowired
    private GraphSpaceService graphSpaceService;

    @GetMapping("list")
    public Object list() {

        ImmutableSet<String> graphSpaces =
                this.clientService.listAllGraphSpaces();
        return ImmutableMap.of("graphspaces", graphSpaces);
    }

    @GetMapping
    public Object queryPage(@RequestParam(name = "query", required = false,
                                    defaultValue = "") String query,
                            @RequestParam(name = "page_no", required = false,
                                    defaultValue = "1") int pageNo,
                            @RequestParam(name = "page_size", required = false,
                                    defaultValue = "10") int pageSize) {
        return graphSpaceService.queryPage(this.authClient(null, null),
                                           query, pageNo, pageSize);
    }

    @GetMapping("{graphspace}")
    public GraphSpace get(@PathVariable("graphspace") String graphspace) {
        return graphSpaceService.get(this.authClient(graphspace, null),
                                     graphspace);
    }

    @PutMapping("{graphspace}")
    public GraphSpace update(@PathVariable("graphspace") String graphspace,
                             @RequestBody GraphSpace graphSpaceEntity) {

        graphSpaceEntity.setName(graphspace);

        return graphSpaceService.update(this.authClient(graphspace, null),
                                        graphSpaceEntity);
    }
}
