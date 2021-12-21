package com.baidu.hugegraph.controller.auth;

import java.util.List;

import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.service.auth.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baidu.hugegraph.common.Constant;
import com.baidu.hugegraph.entity.auth.UserEntity;

@RestController
@RequestMapping(Constant.API_VERSION + "graphspaces/{graphspace}/auth/users")
public class UserController extends AuthController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserEntity> get(@PathVariable("graphspace") String graphSpace) {
        HugeClient client = this.authClient(graphSpace, null);
        return this.userService.listUsers(client);
    }

    @GetMapping("{id}")
    public UserEntity get(@PathVariable("graphspace") String graphSpace,
                          @PathVariable("id") String userId) {
        HugeClient client = this.authClient(graphSpace, null);
        return this.userService.get(client, userId);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("graphspace") String graphSpace,
                       @PathVariable("id") String userId) {
        HugeClient client = this.authClient(graphSpace, null);
        this.userService.delete(client, userId);
    }
}
