'use strict'

/**
 * This module is a wrapper around ramda.js to expose its functions to
 * the global namespace and complememt it with Haskell standard library
 * functions (drop, words, lines etc.).
 */
var r = require('ramda')

/**
 * Add some commonly used haskell functions.
 */
r.words = r.split(' ')
r.lines = r.split('\n')

/**
 * Rename functions that have a different name in Haskell.
 */
r.elem = r.contains

/**
 * Add a function to filter object content.
 */
r.filterObj = r.curry(function(f, obj) {
  return r.reduce(function(accObj, key) {
    if (f(obj[key])) accObj[key] = obj[key]
    return accObj
  }, {}, r.keys(obj))
})

// export the modified ramda library
module.exports = r
