FROM ubuntu:16.04

LABEL maintainer="HugeGraph Hubble Docker Maintainers"

# 1. Install needed dependencies
RUN set -x \
    && apt-get -q update \
    && apt-get -q install -y --no-install-recommends --no-install-suggests \
       curl \
       lsof \
       openjdk-8-jdk \
    && apt-get clean

# 2. Prepare hubble
ENV SERVER_VERSION 3.0.0
COPY hugegraph-hubble-3.0.0.tar.gz /root/hugegraph-hubble-3.0.0.tar.gz
RUN set -e \
    && mkdir -p /root/hugegraph-hubble \
    && tar xzf /root/hugegraph-hubble-3.0.0.tar.gz --strip-components 1 -C /root/hugegraph-hubble \
    && rm -rf /root/hugegraph-hubble-3.0.0.tar.gz

WORKDIR /root
VOLUME /root

ENTRYPOINT ["./hugegraph-hubble/bin/start-docker-hubble.sh"]
