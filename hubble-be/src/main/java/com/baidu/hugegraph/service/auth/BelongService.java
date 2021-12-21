package com.baidu.hugegraph.service.auth;

import java.util.ArrayList;
import java.util.List;

import com.baidu.hugegraph.driver.HugeClient;
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

    public void add(HugeClient client, String gid, String uid) {
        Belong belong = new Belong();
        belong.user(uid);
        belong.group(gid);
        this.add(client, belong);
    }

    public void add(HugeClient client, Belong belong) {
        AuthManager auth = client.auth();
        auth.createBelong(belong);
    }

    public void delete(HugeClient client, String bid) {
        AuthManager auth = client.auth();
        auth.deleteAccess(bid);
    }

    protected List<BelongEntity> listByUser(HugeClient client, String uid) {
        AuthManager auth = client.auth();
        List<BelongEntity> result = new ArrayList<>();

        UserEntity user = userService.get(client, uid);

        auth.listBelongsByUser(uid, -1).forEach(b -> {
            Group group = roleService.get(client, b.group().toString());
            result.add(convert(b, user, group));
        });

        return result;
    }

    public List<BelongEntity> listByGroup(HugeClient client, String gid) {
        Group group = roleService.get(client, gid);

        List<BelongEntity> result = new ArrayList<>();

        client.auth().listBelongsByGroup(gid, -1).forEach(b -> {
            UserEntity user = userService.get(client, b.user().toString());
            result.add(convert(b, user, group));
        });

        return result;
    }

    public List<BelongEntity> listAll(HugeClient client) {
        List<BelongEntity> result = new ArrayList<>();

        client.auth().listBelongs().forEach(b -> {
            Group group = roleService.get(client, b.user().toString());
            UserEntity user = userService.get(client, b.user().toString());
            result.add(convert(b, user, group));
        });

        return result;
    }

    public List<BelongEntity> list(HugeClient client, String gid, String uid) {
        AuthManager auth = client.auth();

        List<BelongEntity> result = new ArrayList<>();

        if (StringUtils.isEmpty(uid) && StringUtils.isEmpty(gid)) {
            return listAll(client);
        } else if (StringUtils.isEmpty(uid) && !StringUtils.isEmpty(gid)) {
            return this.listByGroup(client, gid);
        } else if (!StringUtils.isEmpty(uid) && StringUtils.isEmpty(gid)) {
            return this.listByUser(client, uid);
        } else {
            auth.listBelongsByGroup(gid, -1).forEach(b -> {
                Group group = roleService.get(client, gid);
                UserEntity user = userService.get(client, b.user().toString());
                if (b.user().toString().equals(uid)) {
                    result.add(convert(b, user, group));
                }
            });
        }

        return result;
    }

    public BelongEntity get(HugeClient client, String bid) {
        AuthManager auth = client.auth();
        Belong belong = auth.getBelong(bid);
        if (belong == null) {
            throw new InternalException("auth.belong.get.{} Not Exits",
                                        bid);
        }

        Group group = roleService.get(client, belong.group().toString());
        UserEntity user = userService.get(client, belong.user().toString());

        return convert(belong, user, group);
    }

    protected BelongEntity convert(Belong belong, UserEntity user, Group group) {

        return new BelongEntity(belong.id().toString(),
                                user.getId(), user.getName(),
                                group.id().toString(), group.name());
    }

}
