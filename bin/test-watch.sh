#!/bin/bash

find client -name "*.test.js" \
  | xargs ./node_modules/.bin/mocha \
      --watch \
      --require mocha-clean/brief \
      --reporter min
