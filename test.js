'use strict';

var CondStream = require('./index')
  , inherits = require('util').inherits
  , Writable = require('stream').Writable
  , tape = require('tape')
  , cond
  , test

function TestStream(opts) {
  Writable.call(this, opts)
}
inherits(TestStream, Writable)
TestStream.prototype._write = function(chunk, enc, cb) {
  this.emit('test', chunk)
  cb()
}

cond = new CondStream(function(input) {
  return (!isNaN(Number(input.toString())))
})

test = new TestStream()

tape('basic test', function(t) {
  cond.pipe(test)
  cond.write('a\n')
  cond.write('2s\n')
  cond.write('3.0\n')
  cond.write('1.15\n')
  cond.write('100\n')
  cond.write('2,090\n')
  cond.end('blah\n')

  t.plan(3)
  test.on('test', function(cnt) {
    t.ok(!isNaN(Number(cnt.toString())), cnt.toString() + ' is a number')
  })
})
