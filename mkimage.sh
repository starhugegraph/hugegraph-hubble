#!/usr/bin/env bash

# prepare parent image
docker pull ubuntu:16.04

# build image
docker build -t hugegraph-hubble:3.0.0 -f Dockerfile .

# test
# docker run -itd -p 8089:8088 --name hubble hugegraph-hubble:3.0.0

# save image
# docker save hugegraph-hubble:3.0.0 > hugegraph-hubble-3.0.0.tar
