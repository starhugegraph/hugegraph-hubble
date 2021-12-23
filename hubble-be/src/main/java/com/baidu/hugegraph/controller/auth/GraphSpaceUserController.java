package com.baidu.hugegraph.controller.auth;

import com.baomidou.mybatisplus.core.metadata.IPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baidu.hugegraph.common.Constant;
import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.entity.auth.UserView;
import com.baidu.hugegraph.service.auth.GraphSpaceUserService;

@RestController
@RequestMapping(Constant.API_VERSION + "graphspaces/{graphspace}/auth/users")
public class GraphSpaceUserController extends AuthController {
    @Autowired
    private GraphSpaceUserService userService;

    @GetMapping
    public IPage<UserView> queryPage(@PathVariable("graphspace") String graphSpace,
                                     @RequestParam(name = "query", required = false,
                                             defaultValue = "") String query,
                                     @RequestParam(name = "page_no", required = false,
                                             defaultValue = "1") int pageNo,
                                     @RequestParam(name = "page_size", required = false,
                                             defaultValue = "10") int pageSize) {
        HugeClient client = this.authClient(graphSpace, null);
        return userService.queryPage(client, query, pageNo, pageSize);
    }

    @GetMapping("{id}")
    public UserView get(@PathVariable("graphspace") String graphSpace,
                        @PathVariable("id") String userId) {
        HugeClient client = this.authClient(graphSpace, null);
        return userService.getUser(client, userId);
    }

    @PostMapping
    public UserView create(@PathVariable("graphspace") String graphSpace,
                           @RequestBody UserView userView) {
        HugeClient client = this.authClient(graphSpace, null);
        return userService.create(client, userView);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("graphspace") String graphSpace,
                       @PathVariable("id") String uid) {
        HugeClient client = this.authClient(graphSpace, null);
        userService.unauthUser(client, uid);
    }
}
