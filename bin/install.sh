#!/bin/sh

cd "$( dirname "$0" )/..";

npm cache clean && npm install;

npm run postinstaller;
