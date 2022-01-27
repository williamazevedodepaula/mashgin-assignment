#!/bin/bash

echo "Running entrypoint..."

if [ "$ENVIRONMENT" != "dev" ]; then
  echo "Not in development mode! Building the static files..."
  rm ./static -Rf
  npm run build
  npm run build-storybook
  mv ./build/ ./static
  mv ./storybook-static ./static/storybook
else
  echo "Development mode! installing dependencies..."
  npm install
fi;

#Run container start command
exec  "$@"