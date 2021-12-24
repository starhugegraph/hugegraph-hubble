package com.baidu.hugegraph.service.space;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import com.baomidou.mybatisplus.core.metadata.IPage;

import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.util.PageUtil;
import com.baidu.hugegraph.structure.space.OLTPService;

@Service
public class OLTPServerService {

    public IPage<OLTPService> queryPage(HugeClient client, String query,
                                        int pageNo, int pageSize) {
        List<String> serviceNames = client.serviceManager().listService();
        List<OLTPService> result
                = serviceNames.stream().filter(s -> s.contains(query)).sorted()
                              .map((s) -> client.serviceManager().getService(s))
                              .collect(Collectors.toList());

        return PageUtil.page(result, pageNo, pageSize);
    }

    public OLTPService get(HugeClient client, String service) {
        return client.serviceManager().getService(service);
    }

    public OLTPService create(HugeClient client, OLTPService service) {
        return client.serviceManager().addService(service);
    }

    public void delete(HugeClient client, String service) {
        client.serviceManager().delService(service);
    }

    public OLTPService update(HugeClient client, OLTPService service) {
        return client.serviceManager().updateService(service);
    }
}
