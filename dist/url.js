'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _swig = require('swig');

var _swig2 = _interopRequireWildcard(_swig);

exports['default'] = function (route, locals) {
  return _swig2['default'].render(route, {
    locals: locals
  });
};

module.exports = exports['default'];
//# sourceMappingURL=url.js.map