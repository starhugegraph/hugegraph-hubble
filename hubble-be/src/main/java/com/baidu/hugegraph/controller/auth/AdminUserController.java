package com.baidu.hugegraph.controller.auth;

import com.google.common.collect.ImmutableMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baidu.hugegraph.common.Constant;
import com.baidu.hugegraph.controller.BaseController;
import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.entity.auth.UserEntity;
import com.baidu.hugegraph.structure.auth.User;
import com.baidu.hugegraph.service.auth.UserService;

import java.util.List;

@RestController
@RequestMapping(Constant.API_VERSION + "auth/users")
public class AdminUserController extends BaseController {

    @Autowired
    UserService userService;


    @GetMapping("list")
    public Object list() {

        HugeClient client = this.clientService.createAuthClient(
                null, null, this.getToken());

        List<UserEntity> users = this.userService.listUsers(
                this.authClient(null, null));
        return ImmutableMap.of("users", users);
    }

    @GetMapping
    public Object queryPage(@RequestParam(name = "query", required = false,
            defaultValue = "") String query,
                            @RequestParam(name = "page_no", required = false,
                                    defaultValue = "1") int pageNo,
                            @RequestParam(name = "page_size", required = false,
                                    defaultValue = "10") int pageSize) {
        return userService.queryPage(this.authClient(null, null),
                                           query, pageNo, pageSize);
    }

    @GetMapping("{id}")
    public Object get(@PathVariable("id") String id) {
        return userService.get(this.authClient(null, null),
                                    id);
    }

    @PutMapping("{id}")
    public Object update(@PathVariable("id") String id,
                         @RequestBody User user) {
        return userService.update(this.authClient(null, null), user);
    }

}
