package com.baidu.hugegraph.service.auth;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import lombok.extern.log4j.Log4j2;

import com.baidu.hugegraph.driver.AuthManager;
import com.baidu.hugegraph.entity.auth.UserEntity;
import com.baidu.hugegraph.exception.InternalException;
import com.baidu.hugegraph.structure.auth.User;

@Log4j2
@Service
public class UserService extends AuthService{

    public List<UserEntity> listUsers(int connId) {
        AuthManager auth = this.client(connId).auth();

        auth.listAccesses();
        List<User> users = auth.listUsers();
        List<UserEntity> ues= new ArrayList<>(users.size());
        users.forEach(u -> {
            ues.add(convert(u));
        });

        return ues;
    }

    public UserEntity get(int connId, String userId) {
        AuthManager auth = this.client(connId).auth();
        User user = auth.getUser(userId);
        if (user == null) {
            throw new InternalException("auth.user.get.{} Not Exits",
                    userId);
        }
        return convert(user);
    }

    public void add(int connId, UserEntity ue) {
        User user = new User();
        user.name(ue.getName());
        client(connId).auth().createUser(user);
    }

    protected UserEntity convert(User user) {
        if (user == null) {
            return null;
        }

        return new UserEntity(user.id().toString(), user.name());
    }

    public void delete(int connId, String userId) {
        auth(connId).deleteUser(userId);
    }
}
