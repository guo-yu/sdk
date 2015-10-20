'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.lowLevel = lowLevel;
exports.highLevel = highLevel;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _url3 = require('./url');

var _url4 = _interopRequireDefault(_url3);

function lowLevel(host, method, rules) {
  return function (url) {
    var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    // Return a Promise/A+
    return initRequest({
      host: host,
      url: url,
      method: method,
      rules: rules
    }, params);
  };
}

function highLevel(host, _ref, rules) {
  var url = _ref.url;
  var method = _ref.method;
  var callback = _ref.callback;

  return function () {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    // Return a Promise/A+
    return initRequest({
      host: host,
      rules: rules,
      url: (0, _url4['default'])(url, params),
      method: method ? method.toLowerCase() : 'get'
    }, params, callback);
  };
}

function initRequest(opts, params, middleware) {
  var rules = opts.rules;
  var options = isObject(params) ? params : {};

  if (rules) {
    if (rules.all) options = _lodash2['default'].merge(_lodash2['default'].cloneDeep(rules.all), options);
    if (rules[opts.method]) options = _lodash2['default'].merge(_lodash2['default'].cloneDeep(rules[opts.method]), options);

    if (options.headers) {
      Object.keys(options.headers).forEach(function (k) {
        if (typeof options.headers[k] === 'function') options.headers[k] = options.headers[k]();
      });
    }
  }

  options.method = opts.method;
  options.url = isAbsUri(opts.url) ? opts.url : _url2['default'].resolve(opts.host, opts.url);

  if (options.json == undefined) options.json = true;

  (0, _debug2['default'])('sdk:request')(options);

  return new Promise(function (Resolve, Reject) {
    return (0, _request2['default'])(options, function (err, response, body) {
      if (err) return Reject(err);

      (0, _debug2['default'])('sdk:response:status')(response.statusCode);
      (0, _debug2['default'])('sdk:response:headers')(response.headers);
      (0, _debug2['default'])('sdk:response:body')(body);

      var code = response.statusCode;
      if (code >= 400) return Reject(new Error(code));

      if (_lodash2['default'].isFunction(middleware)) {
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
  return obj && _lodash2['default'].isObject(obj) && !_lodash2['default'].isFunction(obj);
}

function isAbsUri(uri) {
  return uri && (uri.indexOf('http') === 0 || uri.indexOf('https') === 0);
}
//# sourceMappingURL=factory.js.map