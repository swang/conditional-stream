'use strict';

var CondStream = require('./index')
  , cond

cond = new CondStream(function(input) {
  // return true if input string is of type Number
  return (!isNaN(Number(input.toString())))
})

process.stdin.pipe(cond).pipe(process.stdout)
