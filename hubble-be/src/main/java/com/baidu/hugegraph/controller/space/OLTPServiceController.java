package com.baidu.hugegraph.controller.space;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baidu.hugegraph.common.Constant;
import com.baidu.hugegraph.driver.factory.ServiceConfigEntity;

@RestController
@RequestMapping(Constant.API_VERSION + "graphspaces/{graphspace}/services/oltp")
public class OLTPServiceController extends ServiceController {

    @PostMapping
    public Object queryPage(@PathVariable("graphspace") String graphspace,
                            @RequestParam(name = "query", required = false,
                                    defaultValue = "") String query,
                            @RequestParam(name = "page_no", required = false,
                                    defaultValue = "1") int pageNo,
                            @RequestParam(name = "page_size", required = false,
                                    defaultValue = "10") int pageSize) {
        return servicesService.queryOLTPPage(this.authClient(graphspace, null),
                                           query, pageNo, pageSize);
    }

    @GetMapping("{service}")
    public Object get(@PathVariable("graphspace") String graphspace,
                      @PathVariable("service") String service) {
        return servicesService.get(this.authClient(graphspace, null),
                                   service);
    }

    @PostMapping("{service}")
    public Object update(@PathVariable("graphspace") String graphspace,
                         @PathVariable("service") String service,
                         @RequestBody ServiceConfigEntity serviceEntity) {

        serviceEntity.setName(graphspace);

        return null;
    }
}
