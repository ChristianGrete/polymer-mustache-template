#!/bin/sh

cd "$( dirname "$0" )/.."

npm run -q grunt -- build
