package com.baidu.hugegraph.service.auth;

import java.util.ArrayList;
import java.util.List;

import com.baidu.hugegraph.entity.auth.AccessEntity;
import com.baidu.hugegraph.structure.auth.Group;
import com.baidu.hugegraph.structure.auth.Target;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.log4j.Log4j2;

import com.baidu.hugegraph.structure.auth.Access;
import com.baidu.hugegraph.exception.ExternalException;


@Log4j2
@Service
public class AccessService extends AuthService {

    @Autowired
    GroupService groupService;

    @Autowired
    TargetService targetService;

    public AccessEntity get(int connId, String aid) {
        Access access = auth(connId).getAccess(aid);
        if (access == null) {
            throw new ExternalException("auth.access.not-exist.id", aid);
        }

        Group group = this.groupService.get(connId, access.group().toString());
        Target target = this.targetService
                            .get(connId, access.target().toString());

        return convert(access, group, target);
    }

    public List<AccessEntity> list(int connId, String gid, String tid) {
        List<AccessEntity> result = new ArrayList<>();
        auth(connId).listAccessesByGroup(gid, -1).forEach(access -> {
            if (tid == null || access.target().toString().equals(tid)) {
                Group group = this.groupService
                                  .get(connId, access.group().toString());
                Target target = this.targetService
                                    .get(connId, access.target().toString());
                result.add(convert(access, group, target));
            }
        });
        return result;
    }

    public void add(int connId, Access access) {
        auth(connId).createAccess(access);
    }

    public void delete(int connId, String aid) {
        auth(connId).deleteAccess(aid);
    }

    protected AccessEntity convert(Access access, Group group, Target target) {

        return new AccessEntity(access.id().toString(),
                                target.id().toString(), target.name(),
                                group.id().toString(), group.name());
    }
}
