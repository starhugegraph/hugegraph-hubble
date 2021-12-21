package com.baidu.hugegraph.service.space;

import org.springframework.stereotype.Service;

import com.baidu.hugegraph.driver.HugeClient;

@Service
public class ServicesService {

    protected void queryOLTP(HugeClient hugeClient, int pageNo, int pageSize) {
    }


    public Object queryOLTPPage(HugeClient authClient, String query,
                                int pageNo, int pageSize) {
        return null;
    }

    public Object get(HugeClient authClient, String service) {
        return null;
    }
}
