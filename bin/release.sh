#!/bin/sh

cd "$( dirname "$0" )/..";

sh bin/install.sh;

echo "\r\nPlease specify the version sequence to bump (e.g. major, minor or patch):";

read version && npm run -ddd grunt -- -v bump:$version;

git checkout master && git merge develop;

hash="$( git rev-parse --verify HEAD )";

npm run -ddd grunt -- -v modify_json:manifests;

npm run -ddd grunt -- -v build && npm run -ddd grunt -- -v string-replace;

git add {bower,package,typings}.json && git add dist && git add README.md;

npm run -ddd grunt -- -v exec:commit && git push origin master --force;

echo "\r\nPlease enter a short message as a description for this tag/release:";

read message && npm run -ddd grunt -- -v exec:tag --message="$message";

git push origin --tags && npm run -ddd grunt -- -v modify_json:pkg;

npm cache -ddd clean && npm publish -ddd ./;

git reset $hash --hard && npm run -ddd grunt -- -v clean;

git push origin master --force && git checkout develop;
