package com.baidu.hugegraph.service.space;

import java.util.List;
import java.util.stream.Collectors;

import com.baomidou.mybatisplus.core.metadata.IPage;
import org.springframework.stereotype.Service;

import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.structure.space.SchemaTemplate;
import com.baidu.hugegraph.util.PageUtil;

@Service
public class SchemaTemplateService {

    public List<String> listName(HugeClient client) {
        return client.schemaTemplateManager().listSchemTemplate();
    }

    public IPage<SchemaTemplate> queryPage(HugeClient client, String query, int pageNo,
                                           int pageSize) {
        List<String> names = client.schemaTemplateManager().listSchemTemplate();

        List<SchemaTemplate> results =
                names.stream().filter((s) -> s.contains(query)).sorted()
                     .map((s) -> client.schemaTemplateManager()
                                       .getSchemaTemplate(s)
                     ).collect(Collectors.toList());

        return PageUtil.page(results, pageNo, pageSize);
    }

    public SchemaTemplate get(HugeClient client, String name) {
        return client.schemaTemplateManager().getSchemaTemplate(name);
    }

    public SchemaTemplate create(HugeClient client, SchemaTemplate schemaTemplate) {
        return client.schemaTemplateManager().createSchemaTemplate(schemaTemplate);
    }

    public void delete(HugeClient client, String name) {
        client.schemaTemplateManager().deleteSchemaTemplate(name);
    }

    public SchemaTemplate update(HugeClient client, SchemaTemplate schemaTemplate) {
        return client.schemaTemplateManager().updateSchemaTemplate(schemaTemplate);
    }
}
