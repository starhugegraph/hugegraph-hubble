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
import com.baidu.hugegraph.service.auth.BelongService;
import com.baidu.hugegraph.entity.auth.BelongEntity;

@RestController
@RequestMapping(Constant.API_VERSION + "graph-connections/{connId}/auth/belong")
public class BelongController extends AuthController{
    @Autowired
    BelongService belongService;

    @GetMapping
    public List<BelongEntity> list(@PathVariable("connId") int connId,
                                   @RequestParam(value="group_id", required = false) String gid,
                                   @RequestParam(value="user_id", required = false) String uid) {
            return belongService.list(connId, gid, uid);
    }

    @GetMapping("{id}")
    public BelongEntity get(@PathVariable("connId") int connId,
                                   @PathVariable("id") String bid) {
        return belongService.get(connId, bid);
    }

    @PostMapping()
    public void create(@PathVariable("connId") int connId,
                       @RequestBody BelongEntity belongEntity) {
        belongService.add(connId, belongEntity.getRoleId(), belongEntity.getUserId());
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("connId") int connId,
                       @PathVariable("id") String bid) {
        belongService.delete(connId, bid);
    }
}
