package com.baidu.hugegraph.controller.auth;

import java.util.List;

import com.baomidou.mybatisplus.core.metadata.IPage;
import org.apache.commons.lang3.StringUtils;
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
import com.baidu.hugegraph.driver.HugeClient;

@RestController
@RequestMapping(Constant.API_VERSION + "graphspaces/{graphspace}/auth/belongs")
public class BelongController extends AuthController {
    @Autowired
    BelongService belongService;

    public List<BelongEntity> list(
            @PathVariable("graphspace") String graphSpace,
            @RequestParam(value = "group_id", required = false) String gid,
            @RequestParam(value = "user_id", required = false) String uid) {
        HugeClient client = this.authClient(graphSpace, null);
        return belongService.list(client, gid, uid);
    }

    @GetMapping
    public IPage<BelongEntity> listPage(
            @PathVariable("graphspace") String graphSpace,
            @RequestParam(value = "group_id", required = false) String gid,
            @RequestParam(value = "user_id", required =
                    false) String uid,
            @RequestParam(name = "page_no", required = false,
                    defaultValue = "1") int pageNo,
            @RequestParam(name = "page_size", required = false,
                    defaultValue = "10") int pageSize) {
        HugeClient client = this.authClient(graphSpace, null);
        return belongService.listPage(client, gid, uid, pageNo, pageSize);
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
        if (StringUtils.isNotEmpty(groupId) && !StringUtils.isNotEmpty(userId)) {
            belongService.delete(client, groupId, userId);
        }
    }

    @DeleteMapping("ids")
    public void delete(@PathVariable("graphspace") String graphSpace,
                       @RequestParam("ids") String[] ids) {

        HugeClient client = this.authClient(graphSpace, null);

        belongService.deleteMany(client, ids);
    }
}
