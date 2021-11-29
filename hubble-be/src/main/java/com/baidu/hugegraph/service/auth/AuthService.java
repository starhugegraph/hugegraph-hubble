package com.baidu.hugegraph.service.auth;

import com.baidu.hugegraph.driver.AuthManager;
import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.service.HugeClientPoolService;
import org.springframework.beans.factory.annotation.Autowired;

public class AuthService {

    @Autowired
    private HugeClientPoolService poolService;

    protected HugeClient client(int connId) {
        return this.poolService.getOrCreate(connId);
    };

    protected AuthManager auth(int connId) {
        return client(connId).auth();
    }
}
