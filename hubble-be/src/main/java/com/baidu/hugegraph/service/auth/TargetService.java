package com.baidu.hugegraph.service.auth;

import java.util.List;

import com.baidu.hugegraph.driver.HugeClient;
import org.springframework.stereotype.Service;
import lombok.extern.log4j.Log4j2;

import com.baidu.hugegraph.structure.auth.Target;
import com.baidu.hugegraph.exception.ExternalException;

@Log4j2
@Service
public class TargetService extends AuthService{


    public List<Target> list(HugeClient client) {
        List<Target> targets = client.auth().listTargets();

        return targets;
    }

    public Target get(HugeClient client, String tid) {
        Target target = client.auth().getTarget(tid);
        if (target == null) {
            throw new ExternalException("auth.target.not-exist.id", tid);
        }
        return target;
    }

    public void add(HugeClient client, Target target) {
        client.auth().createTarget(target);
    }

    public void update(HugeClient client, Target target) {
        client.auth().updateTarget(target);
    }

    public void delete(HugeClient client, String tid) {
        client.auth().deleteTarget(tid);
    }
}
