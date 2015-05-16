#!/bin/bash

find client -name *.test.js \
  | xargs node_modules/.bin/mocha --require=node_modules/mocha-clean/brief
