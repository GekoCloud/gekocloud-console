#!/bin/bash
echo "Build yarn"
docker-compose -f docker-compose.builder.yaml run --rm build

echo "Build docker container"
docker build -t ks-console .
docker tag ks-console eu.gcr.io/smartkube/console:v3.1.0
docker tag ks-console eu.gcr.io/smartkube/console:latest
docker push eu.gcr.io/smartkube/console:v3.1.0
docker push eu.gcr.io/smartkube/console:latest