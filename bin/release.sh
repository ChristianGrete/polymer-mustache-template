#!/bin/sh

# Changes the working directory to the project root
cd "$( dirname "$0" )/.."

# Makes sure that all dependencies are installed
sh bin/install.sh

# Prompts the user to input the version number category
numbers="major, minor, patch"
echo "\rPlease type in the version number to be increased ($numbers, etc.):\r"
read number

# Increases the version number, commits and pushes the manifests
npm run -q grunt -- bump:$number

# Updates the master branch
git checkout master && git merge develop

# Stores the latest commit hash
commit="$( git rev-parse --verify HEAD )"

# Generates an artifact
sh bin/build.sh

# Prepares, commits and temporary pushes the artifact
npm run -q grunt -- string-replace modify_json:manifests
git add {bower,package,typings}.json dist README.md
npm run -q grunt -- exec:commit && git push -f origin master

# Prompts the user to input a tagging message for Git
echo "\r\nPlease type in a short annotation message for this release:\r"
read message

# Creates and pushes an annotated tag as a release point
npm run -q grunt -- exec:tag --message="$message" && git push origin --tags

# Prepares and publishes the artifact to the npmjs.com registry
npm run -q grunt -- modify_json:pkg && npm publish --loglevel http ./

# Resets the stored commit and cleans the working directory
git reset --hard $commit && sh bin/clean.sh

# Resets the remote and locally checks out the develop branch
git push -f origin master && git checkout develop
