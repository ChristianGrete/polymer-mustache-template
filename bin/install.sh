#!/bin/sh

cd "$( dirname "$0" )/..";

npm cache clean --verbose && npm install --verbose;

npm run --verbose postinstaller;
