package com.baidu.hugegraph.controller.auth;

import com.baidu.hugegraph.controller.BaseController;
import com.baidu.hugegraph.structure.auth.LoginResult;
import com.google.common.collect.ImmutableMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.service.ClientService;
import com.baidu.hugegraph.structure.auth.Login;
import com.baidu.hugegraph.common.Constant;

@RestController
@RequestMapping(Constant.API_VERSION + "auth")
public class LoginController extends BaseController {

    @Autowired
    ClientService clientService;

    @PostMapping("/login")
    public Object login(@RequestBody Login login) {
        HugeClient client = clientService.createUnauthClient();
        LoginResult result = client.auth().login(login);

        this.setSession("username", login.name());
        this.setToken(result.token());

         return ImmutableMap.of("token", result.token());
    }

    @GetMapping("/logout")
    public void logout() {
        this.delToken();
    }
}
