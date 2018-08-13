#!/usr/bin/env bash

set -e -u -x

mv dependency-cache/node_modules hourly_cli
cd hourly_cli && npm test && npm run lint
