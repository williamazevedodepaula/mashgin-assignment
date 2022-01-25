#!/bin/bash

npm install

echo "Running entrypoint..."

#if [ ! -d "/files/images/" ]; then
  #echo "* Images directory is not created. Initiating with sample data..."
  #cp /docker-entrypoint-initfiles.d/images/ /files/images/ -R
#fi

#Run container start command
exec  "$@"