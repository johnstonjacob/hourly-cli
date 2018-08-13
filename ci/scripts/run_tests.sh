#!/usr/bin/env bash

set -e -u -x

mv dependency-cache/node_modules git
cd git && npm test && npm run lint
