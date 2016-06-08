#!/bin/sh

cd "$( dirname "$0" )/.."

echo "Installing npm dependencies\r\n"

npm cache -s clean

npm i -q

npm run -q postinstaller
