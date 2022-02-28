/*
 * Copyright 2017 HugeGraph Authors
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to You under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

package com.baidu.hugegraph.handler;

import com.baidu.hugegraph.exception.ServerException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.baidu.hugegraph.common.Constant;
import com.baidu.hugegraph.common.Response;
import com.baidu.hugegraph.exception.ExternalException;
import com.baidu.hugegraph.exception.IllegalGremlinException;
import com.baidu.hugegraph.exception.InternalException;
import com.baidu.hugegraph.exception.ParameterizedException;
import com.baidu.hugegraph.exception.UnauthorizedException;

import lombok.extern.log4j.Log4j2;

import java.util.List;

@Log4j2
@RestControllerAdvice
public class ExceptionAdvisor {

    @Autowired
    private MessageSourceHandler messageSourceHandler;

    @ExceptionHandler(InternalException.class)
    @ResponseStatus(HttpStatus.OK)
    public Response exceptionHandler(InternalException e) {
        log.info("Log InternalException: ", e);
        String message = this.handleMessage(e.getMessage(), e.args());
        return Response.builder()
                       .status(Constant.STATUS_INTERNAL_ERROR)
                       .message(message)
                       .cause(e.getCause())
                       .build();
    }

    @ExceptionHandler(ExternalException.class)
    @ResponseStatus(HttpStatus.OK)
    public Response exceptionHandler(ExternalException e) {
        log.info("Log ExternalException: ", e);
        String message = this.handleMessage(e.getMessage(), e.args());
        return Response.builder()
                       .status(e.status())
                       .message(message)
                       .cause(e.getCause())
                       .build();
    }

    @ExceptionHandler(ParameterizedException.class)
    @ResponseStatus(HttpStatus.OK)
    public Response exceptionHandler(ParameterizedException e) {
        String message = this.handleMessage(e.getMessage(), e.args());
        return Response.builder()
                       .status(Constant.STATUS_BAD_REQUEST)
                       .message(message)
                       .cause(e.getCause())
                       .build();
    }

    @ExceptionHandler(ServerException.class)
    @ResponseStatus(HttpStatus.OK)
    public Response exceptionHandler(ServerException e) {
        String logMessage = "Log ServerException: \n" + e.exception() + "\n";
        if (e.trace() != null) {
            logMessage += StringUtils.join((List<String>) e.trace(), "\n");
        }
        log.info(logMessage);

        String message = this.handleMessage(e.getMessage(), null);
        return Response.builder()
                       .status(Constant.STATUS_BAD_REQUEST)
                       .message(message)
                       .cause(e.getCause())
                       .build();
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.OK)
    public Response exceptionHandler(Exception e) {
        log.info("Log Exception: ", e);
        String message = this.handleMessage(e.getMessage(), null);
        return Response.builder()
                       .status(Constant.STATUS_BAD_REQUEST)
                       .message(message)
                       .cause(e.getCause())
                       .build();
    }

    @ExceptionHandler(IllegalGremlinException.class)
    @ResponseStatus(HttpStatus.OK)
    public Response exceptionHandler(IllegalGremlinException e) {
        log.info("Log IllegalGremlinException: ", e);
        String message = this.handleMessage(e.getMessage(), e.args());
        return Response.builder()
                       .status(Constant.STATUS_ILLEGAL_GREMLIN)
                       .message(message)
                       .cause(e.getCause())
                       .build();
    }

    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.OK)
    public Response exceptionHandler(UnauthorizedException e) {
        log.info("Log UnauthorizedException: ", e);
        String message = e.getMessage();
        return Response.builder()
                       .status(Constant.STATUS_UNAUTHORIZED)
                       .message(message)
                       .cause(null)
                       .build();
    }

    private String handleMessage(String message, Object[] args) {
        String[] strArgs = null;
        if (args != null && args.length > 0) {
            strArgs = new String[args.length];
            for (int i = 0; i < args.length; i++) {
                strArgs[i] = args[i] != null ? args[i].toString() : "?";
            }
        }
        try {
            message = this.messageSourceHandler.getMessage(message, strArgs);
        } catch (Throwable e) {
            log.error(e.getMessage(), e);
        }
        return message;
    }
}
