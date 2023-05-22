#!/bin/bash

# PRODUCTION
git reset --hard
git pull origin main

npm i yarn -g
yarn global add serve
yarn 
yarn run build
pm2 start "yarn run start:prod" --name=BitSafe-REACT -i max


# DEVELOPMENT
# npm i yarn -g
# yarn 
# pm2 start "yarn run start" --name=BitSafe-REACT


