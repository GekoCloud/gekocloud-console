#!/bin/bash
echo "Build yarn"
docker-compose -f docker-compose.builder.yaml run --rm base yarn build
#docker-compose -f docker-compose.builder.yaml run --rm base yarn serve
echo
echo "Build docker container"
docker build -t ks-console .
docker tag ks-console eu.gcr.io/smartkube/console:v3
