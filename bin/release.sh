#!/bin/sh

cd "$( dirname "$0" )/..";

sh bin/install.sh;

echo "\r\nPlease specify the version sequence to bump (e.g. major, minor or patch):";

read version && grunt bump:$version --verbose;

git checkout master && git merge develop;

hash="$( git rev-parse --verify HEAD )";

grunt modify_json:manifests --verbose && grunt build --verbose;

git add {bower,package}.json && git add dist;

grunt exec:commit --verbose && git push origin master --force;

echo "\r\nPlease enter a short message as a description for this tag/release:";

read message && grunt exec:tag --message="$message" --verbose;

git push origin --tags && npm publish ./;

grunt clean --verbose && git reset $hash --hard;

git push origin master --force && git checkout develop;
