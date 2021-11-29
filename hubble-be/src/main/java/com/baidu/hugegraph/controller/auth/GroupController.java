package com.baidu.hugegraph.controller.auth;

import java.util.List;

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
@RequestMapping(Constant.API_VERSION + "graph-connections/{connId}/auth/group")
public class GroupController<role> extends AuthController {

    @Autowired
    private GroupService groupService;

    @GetMapping
    public List<Group> list(@PathVariable("connId") int connId) {
        return this.groupService.list(connId);
    }

    @GetMapping("{id}")
    public Group get(@PathVariable("connId") int connId,
                     @PathVariable("id") String gid) {
        return this.groupService.get(connId, gid);
    }

    @PostMapping
    public void add(@PathVariable("connId") int connId,
                    @RequestBody Group role) {

        this.groupService.insert(connId, role);
    }

    @PutMapping("{id}")
    public Group update(@PathVariable("connId") int connId,
                        @PathVariable("id") String id,
                        @RequestBody Group group) {
        Group g = this.groupService.get(connId, id);
        g.name(group.name());
        g.description(group.description());

        this.groupService.update(connId, group);

        return g;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("connId") int connId,
                       @PathVariable("id") String id) {
        this.groupService.delete(connId, id);
    }
}
