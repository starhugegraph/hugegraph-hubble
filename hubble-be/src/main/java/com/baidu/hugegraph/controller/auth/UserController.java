package com.baidu.hugegraph.controller.auth;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baidu.hugegraph.common.Constant;
import com.baidu.hugegraph.entity.auth.UserEntity;
import com.baidu.hugegraph.service.auth.UserService;

@RestController
@RequestMapping(Constant.API_VERSION + "graph-connections/{connId}/auth/user")
public class UserController extends AuthController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserEntity> get(@PathVariable("connId") int connId) {
        return this.userService.listUsers(connId);
    }

    @GetMapping("{id}")
    public UserEntity get(@PathVariable("connId") int connId,
                          @PathVariable("id") String userId) {
        return this.userService.get(connId, userId);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("connId") int connId,
                       @PathVariable("id") String userId) {
        this.userService.delete(connId, userId);
    }
}
