#!/bin/sh

docker-compose build
docker-compose down
docker-compose up
docker ps
