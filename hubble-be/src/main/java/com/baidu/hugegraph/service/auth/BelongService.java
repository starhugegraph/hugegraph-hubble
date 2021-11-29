package com.baidu.hugegraph.service.auth;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baidu.hugegraph.driver.AuthManager;
import com.baidu.hugegraph.entity.auth.BelongEntity;
import com.baidu.hugegraph.entity.auth.UserEntity;
import com.baidu.hugegraph.exception.InternalException;
import com.baidu.hugegraph.structure.auth.Belong;
import com.baidu.hugegraph.structure.auth.Group;

@Service
public class BelongService extends AuthService{

    @Autowired
    protected BelongService belongService;
    @Autowired
    protected GroupService roleService;
    @Autowired
    protected UserService userService;

    public void add(int connId, String gid, String uid) {
        Belong belong = new Belong();
        belong.user(uid);
        belong.group(gid);
        this.add(connId, belong);
    }

    public void add(int connId, Belong belong) {
        AuthManager auth = auth(connId);
        auth.createBelong(belong);
    }

    public void delete(int connId, String bid) {
        AuthManager auth = auth(connId);
        auth.deleteAccess(bid);
    }

    protected List<BelongEntity> listByUser(int connId, String uid) {
        AuthManager auth = auth(connId);
        List<BelongEntity> result = new ArrayList<>();

        UserEntity user = userService.get(connId, uid);

        auth.listBelongsByUser(uid, -1).forEach(b -> {
            Group group = roleService.get(connId, b.group().toString());
            result.add(convert(b, user, group));
        });

        return result;
    }

    public List<BelongEntity> listByGroup(int connId, String gid) {
        Group group = roleService.get(connId, gid);

        List<BelongEntity> result = new ArrayList<>();

        auth(connId).listBelongsByGroup(gid, -1).forEach(b -> {
            UserEntity user = userService.get(connId, b.user().toString());
            result.add(convert(b, user, group));
        });

        return result;
    }

    public List<BelongEntity> listAll(int connId) {
        List<BelongEntity> result = new ArrayList<>();

        auth(connId).listBelongs().forEach(b -> {
            Group group = roleService.get(connId, b.user().toString());
            UserEntity user = userService.get(connId, b.user().toString());
            result.add(convert(b, user, group));
        });

        return result;
    }

    public List<BelongEntity> list(int connId, String gid, String uid) {
        AuthManager auth = auth(connId);

        List<BelongEntity> result = new ArrayList<>();

        if (StringUtils.isEmpty(uid) && StringUtils.isEmpty(gid)) {
            return listAll(connId);
        } else if (StringUtils.isEmpty(uid) && !StringUtils.isEmpty(gid)) {
            return this.listByGroup(connId, gid);
        } else if (!StringUtils.isEmpty(uid) && StringUtils.isEmpty(gid)) {
            return this.listByUser(connId, uid);
        } else {
            auth.listBelongsByGroup(gid, -1).forEach(b -> {
                Group group = roleService.get(connId, gid);
                UserEntity user = userService.get(connId, b.user().toString());
                if (b.user().toString().equals(uid)) {
                    result.add(convert(b, user, group));
                }
            });
        }

        return result;
    }

    public BelongEntity get(int connId, String bid) {
        AuthManager auth = auth(connId);
        Belong belong = auth.getBelong(bid);
        if (belong == null) {
            throw new InternalException("auth.belong.get.{} Not Exits",
                                        bid);
        }

        Group group = roleService.get(connId, belong.group().toString());
        UserEntity user = userService.get(connId, belong.user().toString());

        return convert(belong, user, group);
    }

    protected BelongEntity convert(Belong belong, UserEntity user, Group group) {

        return new BelongEntity(belong.id().toString(),
                                user.getId(), user.getName(),
                                group.id().toString(), group.name());
    }

}
