#!/bin/sh

cd "$( dirname "$0" )/.."

npm cache -q clean

npm run -q grunt -- clean
