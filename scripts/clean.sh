#!/bin/bash

set -e

echo "Removing node_modules folder..."

rm -rf node_modules

echo "Successfully removed node_modules."

echo "Removing package-lock.json file..."

rm -rf package-lock.json

echo "Successfully removed package-lock.json."

echo "Clean process completed."
