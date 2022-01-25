#!/bin/bash

npm install

echo "Running entrypoint..."

echo "1) Building react applcation"
npm run build

#if [ ! -d "/files/images/" ]; then
#  cp /docker-entrypoint-initfiles.d/sample/sample-menu.json .storybook/resources/sample-menu.json
#fi

#Run container start command
exec  "$@"