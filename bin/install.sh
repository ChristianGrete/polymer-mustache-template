#!/bin/sh

cd "$( dirname "$0" )/..";

npm cache clean -ddd && npm install -ddd;

npm run -ddd postinstaller;
