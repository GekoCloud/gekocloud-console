#!/bin/bash
echo "Build yarn"
docker-compose -f docker-compose.builder.yaml run --rm base yarn build
#docker-compose -f docker-compose.builder.yaml run --rm base yarn serve
echo
echo "Build docker container"
docker build -t ks-console .
IMAGE_ID=$(docker images | grep ks-console | awk '{print $3}' | head -1)
docker tag ks-console eu.gcr.io/smartkube/console:v3-$IMAGE_ID
docker tag ks-console eu.gcr.io/smartkube/console:v3-latest
docker push eu.gcr.io/smartkube/console:v3-$IMAGE_ID
docker push eu.gcr.io/smartkube/console:v3-latest
