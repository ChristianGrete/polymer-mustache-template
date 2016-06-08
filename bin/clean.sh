#!/bin/sh

cd "$( dirname "$0" )/..";

echo "Cleaning npm cache\r\n";

npm cache ls && echo "\r" && npm cache -ddd clean;

echo "\r\nRunning npm script \`grunt -d --stack clean\`\r\n";

npm run -ddd grunt -- -d --stack clean;
