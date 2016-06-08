#!/bin/sh

cd "$( dirname "$0" )/..";

npm cache -ddd clean && npm run -ddd grunt -- -v clean;
