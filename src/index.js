'use strict';

var { Duplex: duplex } = require('stream')

export default class ConditionalStream extends duplex {
  constructor(condFunc, opts) {
    super(opts);

    if (!(this instanceof ConditionalStream)) {
      return new ConditionalStream(condFunc, opts);
    }

    if (typeof condFunc !== 'function') {
      throw new Error('Must pass a function as first parameter')
    }

    this.condFunc = condFunc
  }
  _read() {}
  _write(chunk, enc, callback) {
    if (chunk === null) {
      return this.push('')
    }
    if (this.condFunc(chunk)) {
      this.push(chunk)
    }
    callback()
  }
}
