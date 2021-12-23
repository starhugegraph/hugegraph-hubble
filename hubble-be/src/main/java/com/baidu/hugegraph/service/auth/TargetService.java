package com.baidu.hugegraph.service.auth;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import com.baidu.hugegraph.driver.HugeClient;
import com.baidu.hugegraph.util.PageUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
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

    public IPage<Target> queryPage(HugeClient client, String query, int pageNo,
                                   int pageSize) {

        List<Target> results =
                list(client).stream()
                            .filter(target -> target.graph().contains(query))
                            .sorted(Comparator.comparing(Target::name))
                            .collect(Collectors.toList());

        return PageUtil.page(results, pageNo, pageSize);
    }

    public Target get(HugeClient client, String tid) {
        Target target = client.auth().getTarget(tid);
        if (target == null) {
            throw new ExternalException("auth.target.not-exist.id", tid);
        }
        return target;
    }

    public Target add(HugeClient client, Target target) {
        return client.auth().createTarget(target);
    }

    public Target update(HugeClient client, Target target) {
        return client.auth().updateTarget(target);
    }

    public void delete(HugeClient client, String tid) {
        client.auth().deleteTarget(tid);
    }
}
