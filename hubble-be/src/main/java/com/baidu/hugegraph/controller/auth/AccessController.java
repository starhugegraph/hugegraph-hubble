package com.baidu.hugegraph.controller.auth;

import java.util.List;

import com.baidu.hugegraph.driver.HugeClient;
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
@RequestMapping(Constant.API_VERSION + "graphspaces/{graphspace}/auth/accesses")
public class AccessController extends AuthController {

    @Autowired
    AccessService accessService;

    @GetMapping
    public List<AccessEntity> list(@PathVariable("graphspace") String graphSpace,
                                   @RequestParam(value="group_id", required = false) String gid,
                                   @RequestParam(value="target_id", required = false) String tid) {
        HugeClient client = this.authClient(graphSpace, null);
        return this.accessService.list(client, gid, tid);
    }

    @GetMapping("{id}")
    public AccessEntity get(@PathVariable("graphspace") String graphSpace,
                            @PathVariable("id") String aid) {
        HugeClient client = this.authClient(graphSpace, null);
        return this.accessService.get(client, aid);
    }

    @PostMapping
    public Access add(@PathVariable("graphspace") String graphSpace,
                    @RequestBody Access access) {
        HugeClient client = this.authClient(graphSpace, null);
        return this.accessService.add(client, access);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("graphspace") String graphSpace,
                       @PathVariable("id") String aid) {
        HugeClient client = this.authClient(graphSpace, null);
        this.accessService.delete(client, aid);
    }
}
