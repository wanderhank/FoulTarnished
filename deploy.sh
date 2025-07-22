#!/bin/sh
#script para execução do Docker
docker-compose build
docker-compose down
docker-compose up
docker ps
