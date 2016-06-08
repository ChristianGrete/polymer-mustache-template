#!/bin/sh

cd "$( dirname "$0" )/..";

npm cache -ddd clean && npm install -ddd;

npm run -ddd postinstaller;
