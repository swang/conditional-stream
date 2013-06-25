'use strict';

var duplex = require('stream').Duplex
  , inherits = require('util').inherits

function ConditionalStream(condFunc, opts) {
  if (!(this instanceof ConditionalStream))
    return new ConditionalStream(condFunc, opts);

  duplex.call(this, opts)

  if (typeof condFunc !== 'function') {
    throw new Error("Must pass a function as first parameter")
  }
  this.condFunc = condFunc
}

inherits(ConditionalStream, duplex)

ConditionalStream.prototype._read = function() {};

ConditionalStream.prototype._write = function(chunk, enc, callback) {
  if (chunk === null) {
    return this.push('')
  }
  if (this.condFunc(chunk)) {
    this.push(chunk)
  }
  callback()
}

module.exports = ConditionalStream