#!/bin/sh

cd "$( dirname "$0" )/..";

sh bin/install.sh;

echo "\r\nPlease specify the version sequence to bump (e.g. major, minor or patch):";

read version && npm run grunt -- bump:$version --verbose;

git checkout master && git merge develop;

hash="$( git rev-parse --verify HEAD )";

npm run grunt -- modify_json:manifests --verbose;

npm run grunt -- build --verbose && npm run grunt -- string-replace --verbose;

git add {bower,package,typings}.json && git add dist && git add README.md;

npm run grunt -- exec:commit --verbose && git push origin master --force;

echo "\r\nPlease enter a short message as a description for this tag/release:";

read message && npm run grunt -- exec:tag --message="$message" --verbose;

git push origin --tags && npm publish ./;

npm run grunt -- clean --verbose && git reset $hash --hard;

git push origin master --force && git checkout develop;
