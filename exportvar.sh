#!/bin/sh
#script para exportação de variáveis (caso queira rodar a aplicação localmente e não no Docker)
export $(grep -v '^#' .env | xargs)