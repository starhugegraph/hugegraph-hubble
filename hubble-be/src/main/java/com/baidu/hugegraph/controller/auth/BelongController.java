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
import com.baidu.hugegraph.service.auth.BelongService;
import com.baidu.hugegraph.entity.auth.BelongEntity;

@RestController
@RequestMapping(Constant.API_VERSION + "graphspaces/{graphspace}/auth/belongs")
public class BelongController extends AuthController{
    @Autowired
    BelongService belongService;

    @GetMapping
    public List<BelongEntity> list(@PathVariable("graphspace") String graphSpace,
                                   @RequestParam(value="group_id", required = false) String gid,
                                   @RequestParam(value="user_id", required = false) String uid) {
        HugeClient client = this.authClient(graphSpace, null);
        return belongService.list(client, gid, uid);
    }

    @GetMapping("{id}")
    public BelongEntity get(@PathVariable("graphspace") String graphSpace,
                            @PathVariable("id") String bid) {
        HugeClient client = this.authClient(graphSpace, null);
        return belongService.get(client, bid);
    }

    @PostMapping()
    public void create(@PathVariable("graphspace") String graphSpace,
                       @RequestBody BelongEntity belongEntity) {
        HugeClient client = this.authClient(graphSpace, null);
        belongService.add(client, belongEntity.getGroupId(),
                          belongEntity.getUserId());
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("graphspace") String graphSpace,
                       @PathVariable("id") String bid) {
        HugeClient client = this.authClient(graphSpace, null);
        belongService.delete(client, bid);
    }

    @DeleteMapping
    public void delete(@PathVariable("graphspace") String graphSpace,
                       @RequestParam("group_id") String groupId,
                       @RequestParam("user_id") String userId) {

        HugeClient client = this.authClient(graphSpace, null);
        belongService.delete(client, groupId, userId);
    }
}
