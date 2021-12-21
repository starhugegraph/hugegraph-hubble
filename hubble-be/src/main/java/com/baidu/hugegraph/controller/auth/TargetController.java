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
import org.springframework.web.bind.annotation.RestController;

import com.baidu.hugegraph.common.Constant;
import com.baidu.hugegraph.service.auth.TargetService;
import com.baidu.hugegraph.structure.auth.Target;

@RestController
@RequestMapping(Constant.API_VERSION + "graphspaces/{graphspace}/auth/targets")
public class TargetController extends AuthController {
    @Autowired
    TargetService targetService;

    @GetMapping
    public List<Target> list(@PathVariable("graphspace") String graphSpace) {

        HugeClient client = this.authClient(graphSpace, null);
        return this.targetService.list(client);
    }

    @GetMapping("{id}")
    public Target get(@PathVariable("graphspace") String graphSpace,
                      @PathVariable("id") String tid) {
        HugeClient client = this.authClient(graphSpace, null);
        return this.targetService.get(client, tid);
    }

    @PostMapping
    public void add(@PathVariable("graphspace") String graphSpace,
                    @RequestBody Target target) {
        HugeClient client = this.authClient(graphSpace, null);
        this.targetService.add(client, target);
    }

    @PutMapping("{id}")
    public Target update(@PathVariable("graphspace") String graphSpace,
                         @PathVariable("id") String tid,
                         @RequestBody Target target) {
        HugeClient client = this.authClient(graphSpace, null);
        Target t = this.targetService.get(client, tid);
        t.resources(target.resources());
        this.targetService.update(client, t);

        return t;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("graphspace") String graphSpace,
                       @PathVariable("id") String tid) {
        HugeClient client = this.authClient(graphSpace, null);
        this.targetService.delete(client, tid);
    }
}
