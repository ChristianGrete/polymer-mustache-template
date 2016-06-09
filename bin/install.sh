#!/bin/sh

cd "$( dirname "$0" )/.."

npm cache -s clean

npm i --no-progress -q

npm run -q typings -- install
