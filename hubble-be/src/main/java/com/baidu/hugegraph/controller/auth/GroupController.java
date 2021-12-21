package com.baidu.hugegraph.controller.auth;

import java.util.List;

import com.baidu.hugegraph.driver.HugeClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baidu.hugegraph.common.Constant;
import com.baidu.hugegraph.service.auth.GroupService;
import com.baidu.hugegraph.structure.auth.Group;

@RestController
@RequestMapping(Constant.API_VERSION + "graphspaces/{graphspace}/auth/groups")
public class GroupController<role> extends AuthController {

    @Autowired
    private GroupService groupService;

    @GetMapping
    public List<Group> list(@PathVariable("graphspace") String graphSpace) {
        HugeClient client = this.authClient(graphSpace, null);
        return this.groupService.list(client);
    }

    @GetMapping("{id}")
    public Group get(@PathVariable("graphspace") String graphSpace,
                     @PathVariable("id") String gid) {
        HugeClient client = this.authClient(graphSpace, null);
        return this.groupService.get(client, gid);
    }

    @PostMapping
    public void add(@PathVariable("graphspace") String graphSpace,
                    @RequestBody Group role) {
        HugeClient client = this.authClient(graphSpace, null);
        this.groupService.insert(client, role);
    }

    @PutMapping("{id}")
    public Group update(@PathVariable("graphspace") String graphSpace,
                        @PathVariable("id") String id,
                        @RequestBody Group group) {
        HugeClient client = this.authClient(graphSpace, null);
        Group g = this.groupService.get(client, id);
        g.name(group.name());
        g.description(group.description());

        this.groupService.update(client, group);

        return g;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("graphspace") String graphSpace,
                       @PathVariable("id") String id) {
        HugeClient client = this.authClient(graphSpace, null);
        this.groupService.delete(client, id);
    }
}
