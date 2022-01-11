#!/usr/bin/env bash

# prepare parent image
docker pull ubuntu:16.04

# build image
docker build -t hugegraph-hubble:3.0.0 -f Dockerfile .

# test
# docker run -d --name hubble -p 127.0.0.1:8088:8088 hugegraph-hubble:3.0.0

# save image
# docker save hugegraph-hubble:3.0.0 > hugegraph-hubble-3.0.0.tar


