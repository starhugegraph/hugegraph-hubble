package com.baidu.hugegraph.service.space;

import java.util.ArrayList;

import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.entity.space.ComputerServiceEntity;
import com.baidu.hugegraph.structure.Task;
import com.baidu.hugegraph.util.PageUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import org.springframework.stereotype.Service;

@Service
public class ComputerService {
    public IPage<ComputerServiceEntity> queryPgae(HugeClient client, String query,
                                             int pageNo,
                                 int pageSize) {
        ArrayList results = new ArrayList<ComputerService>();
        client.computer().list(-1).forEach((t) -> {
            ComputerServiceEntity entity = convert(t);
            entity.setGraphSpace(client.getGraphSpaceName());
            entity.setGraph(client.getGraphName());
            results.add(entity);
        });

        return PageUtil.page(results, pageNo, pageSize);
    }

    public void cancel(HugeClient client, long id) {
        client.computer().cancel(id);
    }

    protected ComputerServiceEntity convert(Task task) {
        ComputerServiceEntity entity = new ComputerServiceEntity();
        entity.setId(task.id());
        entity.setName(task.name());
        entity.setType(task.type());
        entity.setDescription(task.description());
        entity.setCreate(task.createTime());


        return entity;
    }
}
