#!/bin/bash

set -e
set -x

rm -rf dist
parcel build src/index.html
scp -r dist/* root@193.70.79.72:/usr/share/nginx/html
