#!/bin/bash

echo "Running entrypoint..."

rm ./static -Rf
npm run build
npm run build-storybook
mv ./build/ ./static
mv ./storybook-static ./static/storybook

#Run container start command
exec  "$@"