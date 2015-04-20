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

var _request = require('request');

var _request2 = _interopRequireWildcard(_request);

var _urlmaker = require('./url');

var _urlmaker2 = _interopRequireWildcard(_urlmaker);

function lowLevel(host, method, rules) {
  return function (url, params, callback) {
    if (!url) return false;

    return initRequest({
      host: host,
      url: url,
      method: method,
      rules: rules }, params, callback);
  };
}

function highLevel(host, route, rules) {
  return function (params, callback) {
    return initRequest({
      host: host,
      rules: rules,
      url: _urlmaker2['default'](route.url, params || {}),
      method: route.method ? route.method.toLowerCase() : 'get' }, params, callback, function (err, res, body, done) {
      if (route.callback && _import2['default'].isFunction(route.callback)) return route.callback(err, res, body, done);

      return done(err, res, body);
    });
  };
}

function initRequest(opts, params, callback, next) {
  var rules = opts.rules;
  var done = retCallback(params, callback);
  var options = isObject(params) ? params : {};

  if (rules) {
    if (rules.all) options = _import2['default'].merge(_import2['default'].cloneDeep(rules.all), options);
    if (rules[opts.method]) options = _import2['default'].merge(_import2['default'].cloneDeep(rules[opts.method]), options);
  }

  options.url = isAbsUri(opts.url) ? opts.url : _url2['default'].resolve(opts.host, opts.url);

  options.method = opts.method;

  if (options.json == undefined) options.json = true;

  _debug2['default']('sdk:request')(options);

  return _request2['default'](options, function (err, res, body) {
    return defaultCallback(err, res, body);
  });

  function defaultCallback(err, res, body) {
    var cb = next || done;
    if (err) {
      _debug2['default']('sdk:response:error')(err);
      return cb(err, res, null, done);
    }

    _debug2['default']('sdk:response:status')(res.statusCode);
    _debug2['default']('sdk:response:headers')(res.headers);
    _debug2['default']('sdk:response:body')(body);

    var code = res.statusCode;
    if (code !== 200) {
      return cb(new Error(code), res, body, done);
    }return cb(null, res, body, done);
  }
}

function retCallback(params, callback) {
  if (!params && !callback) {
    return emptyCallback;
  }if (_import2['default'].isFunction(params) && !callback) {
    return params;
  }if (callback && _import2['default'].isFunction(callback)) {
    return callback;
  }return emptyCallback;

  function emptyCallback() {}
}

function isObject(obj) {
  return obj && _import2['default'].isObject(obj) && !_import2['default'].isFunction(obj);
}

function isAbsUri(uri) {
  return uri && (uri.indexOf('http') === 0 || uri.indexOf('https') === 0);
}
//# sourceMappingURL=factory.js.map