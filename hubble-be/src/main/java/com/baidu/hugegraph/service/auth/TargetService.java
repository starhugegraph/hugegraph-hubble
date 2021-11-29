package com.baidu.hugegraph.service.auth;

import java.util.List;

import org.springframework.stereotype.Service;
import lombok.extern.log4j.Log4j2;

import com.baidu.hugegraph.structure.auth.Target;
import com.baidu.hugegraph.exception.ExternalException;

@Log4j2
@Service
public class TargetService extends AuthService{


    public List<Target> list(int connId) {
        List<Target> targets = auth(connId).listTargets();

        return targets;
    }

    public Target get(int connId, String tid) {
        Target target = auth(connId).getTarget(tid);
        if (target == null) {
            throw new ExternalException("auth.target.not-exist.id", tid);
        }
        return target;
    }

    public void add(int connId, Target target) {
        auth(connId).createTarget(target);
    }

    public void update(int connId, Target target) {
        auth(connId).updateTarget(target);
    }

    public void delete(int connId, String tid) {
        auth(connId).deleteTarget(tid);
    }
}
