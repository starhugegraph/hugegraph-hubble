package com.baidu.hugegraph.controller.space;

import com.baidu.hugegraph.controller.BaseController;
import com.baidu.hugegraph.service.space.ServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServiceController extends BaseController {
    @Autowired
    ServicesService servicesService;
}
