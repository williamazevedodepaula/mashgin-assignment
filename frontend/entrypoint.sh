#!/bin/bash


echo "Running entrypoint..."

rm ./.env.json -R
echo "{\"REACT_APP_API_URL\":\"$API_URL\"}" >> .env.json

#Run container start command
exec  "$@"