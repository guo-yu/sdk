'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.lowLevel = lowLevel;
exports.highLevel = highLevel;

var _url = require('url');

var _url2 = _interopRequireWildcard(_url);

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _debug = require('debug');

var _debug2 = _interopRequireWildcard(_debug);

var _Promise = require('bluebird');

var _Promise2 = _interopRequireWildcard(_Promise);

var _request = require('request');

var _request2 = _interopRequireWildcard(_request);

var _urlmaker = require('./url');

var _urlmaker2 = _interopRequireWildcard(_urlmaker);

function lowLevel(host, method, rules) {
  return function (url) {
    var params = arguments[1] === undefined ? {} : arguments[1];

    // Return a Promise/A+
    return initRequest({
      host: host,
      url: url,
      method: method,
      rules: rules }, params);
  };
}

function highLevel(host, _ref, rules) {
  var url = _ref.url;
  var method = _ref.method;
  var callback = _ref.callback;

  return function () {
    var params = arguments[0] === undefined ? {} : arguments[0];

    // Return a Promise/A+
    return initRequest({
      host: host,
      rules: rules,
      url: _urlmaker2['default'](url, params),
      method: method ? method.toLowerCase() : 'get' }, params, callback);
  };
}

function initRequest(opts, params, middleware) {
  var rules = opts.rules;
  var options = isObject(params) ? params : {};

  if (rules) {
    if (rules.all) options = _import2['default'].merge(_import2['default'].cloneDeep(rules.all), options);
    if (rules[opts.method]) options = _import2['default'].merge(_import2['default'].cloneDeep(rules[opts.method]), options);

    if (options.headers) {
      Object.keys(options.headers).forEach(function (k) {
        if (typeof options.headers[k] === 'function') options.headers[k] = options.headers[k]();
      });
    }
  }

  options.method = opts.method;
  options.url = isAbsUri(opts.url) ? opts.url : _url2['default'].resolve(opts.host, opts.url);

  if (options.json == undefined) options.json = true;

  _debug2['default']('sdk:request')(options);

  return new _Promise2['default'](function (Resolve, Reject) {
    return _request2['default'](options, function (err, response, body) {
      if (err) return Reject(err);

      _debug2['default']('sdk:response:status')(response.statusCode);
      _debug2['default']('sdk:response:headers')(response.headers);
      _debug2['default']('sdk:response:body')(body);

      var code = response.statusCode;
      if (code >= 400) return Reject(new Error(code));

      if (_import2['default'].isFunction(middleware)) {
        return middleware(response, body, function (customError, customBody) {
          if (customError) return Reject(customError);

          return Resolve({
            code: code,
            response: response,
            body: customBody || body
          });
        });
      }

      return Resolve({
        code: code,
        response: response,
        body: body
      });
    });
  });
}

function isObject(obj) {
  return obj && _import2['default'].isObject(obj) && !_import2['default'].isFunction(obj);
}

function isAbsUri(uri) {
  return uri && (uri.indexOf('http') === 0 || uri.indexOf('https') === 0);
}
//# sourceMappingURL=factory.js.map