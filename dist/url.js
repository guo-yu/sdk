'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _swig = require('swig');

var _swig2 = _interopRequireDefault(_swig);

exports['default'] = function (route, locals) {
  return _swig2['default'].render(route, {
    locals: locals
  });
};

module.exports = exports['default'];
//# sourceMappingURL=url.js.map