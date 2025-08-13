#!/bin/sh
#script para execução do Docker
docker-compose build app
docker-compose up -d
docker ps
