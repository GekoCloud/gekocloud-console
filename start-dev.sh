#!/bin/bash
echo "Compile and install dependencies"
make setup
make install
make yarn-lego

echo "Start dev environment"
make dev
