'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
'use strict';

var _require = require('stream');

var duplex = _require.Duplex;

var ConditionalStream = (function (_duplex) {
  function ConditionalStream(condFunc, opts) {
    _classCallCheck(this, ConditionalStream);

    _get(Object.getPrototypeOf(ConditionalStream.prototype), 'constructor', this).call(this, opts);

    if (!(this instanceof ConditionalStream)) {
      return new ConditionalStream(condFunc, opts);
    }

    if (typeof condFunc !== 'function') {
      throw new Error('Must pass a function as first parameter');
    }

    this.condFunc = condFunc;
  }

  _inherits(ConditionalStream, _duplex);

  _createClass(ConditionalStream, [{
    key: '_read',
    value: function _read() {}
  }, {
    key: '_write',
    value: function _write(chunk, enc, callback) {
      if (chunk === null) {
        return this.push('');
      }
      if (this.condFunc(chunk)) {
        this.push(chunk);
      }
      callback();
    }
  }]);

  return ConditionalStream;
})(duplex);

exports['default'] = ConditionalStream;
module.exports = exports['default'];
