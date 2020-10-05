#!/bin/sh

set -e

env=${APP_ENV:-production}

if [ "$env" = "production" ]; then

    echo "Copying PRODUCTION env"
    cp /home/node/app/.env.prod /home/node/app/.env

    echo "Starting NodeJS production environment"
    exec node /home/node/app/server.js

elif [ "$env" = "test" ]; then

    echo "Copying TEST env"
    cp /home/node/app/.env.test /home/node/app/.env

    echo "Starting NodeJS testing environment"
    exec node /home/node/app/server.js

else

  echo "Copying DEV env"
  cp /home/node/app/.env.dev /home/node/app/.env

  echo "Starting NodeJS development environment"
  exec nodemon /home/node/app/server.js

fi
