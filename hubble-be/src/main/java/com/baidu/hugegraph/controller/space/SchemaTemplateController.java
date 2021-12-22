package com.baidu.hugegraph.controller.space;

import java.util.List;

import com.google.common.collect.ImmutableMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baidu.hugegraph.common.Constant;
import com.baidu.hugegraph.controller.BaseController;
import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.service.space.SchemaTemplateService;
import com.baidu.hugegraph.structure.space.SchemaTemplate;


@RestController
@RequestMapping(Constant.API_VERSION + "graphspaces/{graphspace" +
        "}/schematemplates")
public class SchemaTemplateController extends BaseController {
    @Autowired
    SchemaTemplateService schemaTemplateService;

    @GetMapping("list")
    public Object listName(@PathVariable("graphspace") String graphSpace) {
        HugeClient client = this.authClient(graphSpace, null);
        List<String> names = schemaTemplateService.listName(client);

        return ImmutableMap.of("schemas", names);
    }

    @GetMapping()
    public Object list(@PathVariable("graphspace") String graphSpace,
                       @RequestParam(name = "query", required = false,
                               defaultValue = "") String query,
                       @RequestParam(name = "page_no", required = false,
                               defaultValue = "1") int pageNo,
                       @RequestParam(name = "page_size", required = false,
                               defaultValue = "10") int pageSize) {
        HugeClient client = this.authClient(graphSpace, null);
        return schemaTemplateService.queryPage(client, query, pageNo, pageSize);
    }

    @GetMapping("{name}")
    public Object get(@PathVariable("graphspace") String graphSpace,
                      @PathVariable("name") String name) {
        HugeClient client = this.authClient(graphSpace, null);
        return schemaTemplateService.get(client, name);
    }

    @PostMapping
    public Object create(@PathVariable("graphspace") String graphSpace,
                         @RequestBody SchemaTemplate schemaTemplate) {
        HugeClient client = this.authClient(graphSpace, null);

        return schemaTemplateService.create(client, schemaTemplate);
    }

    @DeleteMapping("{name}")
    public void delete(@PathVariable("graphspace") String graphSpace,
                       @PathVariable("name") String name) {
        HugeClient client = this.authClient(graphSpace, null);
        schemaTemplateService.delete(client, name);
    }

    @PutMapping("{name}")
    public Object update(@PathVariable("graphspace") String graphSpace,
                         @PathVariable("name") String name,
                         @RequestBody SchemaTemplate schemaTemplate) {
        HugeClient client = this.authClient(graphSpace, null);
        schemaTemplate.name(name);
        return schemaTemplateService.update(client, schemaTemplate);
    }
}
