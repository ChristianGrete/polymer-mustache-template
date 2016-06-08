#!/bin/sh

cd "$( dirname "$0" )/..";

npm run -ddd grunt -- -v build;
