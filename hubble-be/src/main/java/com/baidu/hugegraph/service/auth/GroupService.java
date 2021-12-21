package com.baidu.hugegraph.service.auth;

import java.util.List;

import com.baidu.hugegraph.rest.ClientException;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j2;

import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.driver.AuthManager;
import com.baidu.hugegraph.exception.ExternalException;
import com.baidu.hugegraph.structure.auth.Group;


@Log4j2
@Service
public class GroupService extends AuthService {

    public Group get(HugeClient client, String gid) {
        AuthManager auth = client.auth();
        Group group = auth.getGroup(gid);
        if (group == null) {
            throw new ExternalException("auth.role.get.not-exist",
                    gid);
        }

        return group;
    }

    public List<Group> list(HugeClient client) {
        List<Group> roles = client.auth().listGroups();

        return roles;
    }

    public void update(HugeClient client, Group group) {
        AuthManager auth = client.auth();
        if (auth.getGroup(group.id()) == null ) {
            throw new ExternalException("auth.role.not-exist",
                                        group.id(), group.name());
        }

        auth.updateGroup(group);
    }

    public void insert(HugeClient client, Group group) {
        AuthManager auth = client.auth();

        auth.createGroup(group);
    }

    public void delete(HugeClient client, String gid) {
        AuthManager auth = client.auth();
        Group group = GroupService.getGroup(auth, gid);

        auth.deleteGroup(gid);

        auth.listAccessesByGroup(group, -1).forEach(
            access -> {
                auth.deleteAccess(access.id());
            }
        );
    }

    protected static Group getGroup(AuthManager auth, String gid) {
        Group group = auth.getGroup(gid);
        if (group == null) {
            throw new ExternalException("auth.role.not-exist",
                    gid);
        }
        return group;
    }
}
