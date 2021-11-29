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
import org.springframework.web.bind.annotation.RestController;

import com.baidu.hugegraph.common.Constant;
import com.baidu.hugegraph.service.auth.TargetService;
import com.baidu.hugegraph.structure.auth.Target;

@RestController
@RequestMapping(Constant.API_VERSION + "graph-connections/{connId}/auth/target")
public class TargetController extends AuthController {
    @Autowired
    TargetService targetService;

    @GetMapping
    public List<Target> list(@PathVariable("connId") int connId) {

        return this.targetService.list(connId);
    }

    @GetMapping("{id}")
    public Target get(@PathVariable("connId") int connId,
                      @PathVariable("id") String tid) {
        return this.targetService.get(connId, tid);
    }

    @PostMapping
    public void add(@PathVariable("connId") int connId,
                      @RequestBody Target target) {
        this.targetService.add(connId, target);
    }

    @PutMapping("{id}")
    public Target update(@PathVariable("connId") int connId,
                         @PathVariable("id") String tid,
                         @RequestBody Target target) {
        Target t = this.targetService.get(connId, tid);
        t.resources(target.resources());
        this.targetService.update(connId, t);

        return t;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("connId") int connId,
                       @PathVariable("id") String tid) {
        this.targetService.delete(connId, tid);
    }
}
