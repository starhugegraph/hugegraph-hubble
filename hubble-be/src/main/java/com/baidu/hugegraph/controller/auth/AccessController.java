package com.baidu.hugegraph.controller.auth;

import java.util.List;

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
import com.baidu.hugegraph.service.auth.AccessService;
import com.baidu.hugegraph.structure.auth.Access;
import com.baidu.hugegraph.entity.auth.AccessEntity;

@RestController
@RequestMapping(Constant.API_VERSION + "graph-connections/{connId}/auth/access")
public class AccessController extends AuthController {

    @Autowired
    AccessService accessService;

    @GetMapping
    public List<AccessEntity> list(@PathVariable("connId") int connId,
                                   @RequestParam(value="group_id", required = false) String gid,
                                   @RequestParam(value="target_id", required = false) String tid) {
        return this.accessService.list(connId, gid, tid);
    }

    @GetMapping("{id}")
    public AccessEntity get(@PathVariable("connId") int connId,
                      @PathVariable("id") String aid) {
        return this.accessService.get(connId, aid);
    }

    @PostMapping
    public void add(@PathVariable("connId") int connId,
                    @RequestBody Access access) {
        this.accessService.add(connId, access);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("connId") int connId,
                       @PathVariable("id") String aid) {
        this.accessService.delete(connId, aid);
    }
}
