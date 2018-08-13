#!/usr/bin/env bash

set -e -u -x

mv dependency-cache/node_modules hourly-cli
cd hourly-cli && npm test && npm run lint
