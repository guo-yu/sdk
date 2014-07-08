var url = require('url');
var _ = require('lodash');
var debug = require('debug');
var request = require('request');
var urlmaker = require('./url');

exports.highLevel = highLevel;
exports.lowLevel = lowLevel;

function lowLevel(host, method, rules) {
  return function(url, params, callback) {
    if (!url) return false;
    return initRequest({
      host: host,
      url: url,
      method: method,
      rules: rules
    }, params, callback);
  };
}

function highLevel(host, route, rules) {
  return function(params, callback) {
    return initRequest({
      host: host,
      url: urlmaker(route.url, params || {}),
      method: route.method ? route.method.toLowerCase() : 'get',
      rules: rules
    }, params, callback, function(err, res, body, done) {
      if (route.callback && _.isFunction(route.callback)) {
        return route.callback(err, res, body, done);
      }
      return done(err, res, body);
    });
  };
}

function initRequest(opts, params, callback, next) {
  var rules = opts.rules;
  var done = (_.isFunction(params) && !callback) ? params : callback;
  var options = (params && _.isObject(params)) ? params : {};

  if (rules) {
    if (rules.all) options = _.merge(rules.all, options);
    options = _.merge(rules[opts.method] || {}, options);
  }

  options.url = url.resolve(opts.host, opts.url);
  options.method = opts.method;
  options.json = true;

  debug('sdk:req')(options);

  return request(options, function(err, res, body) {
    return defaultCallback(err, res, body);
  });

  function defaultCallback(err, res, body) {
    debug('sdk:res')(res['headers']);
    debug('sdk:res:body')(body);
    var cb = next || done;
    if (err) return cb(err, res, null, done);
    var code = res.statusCode;
    if (code !== 200) return cb(new Error(code), res, body, done);
    return cb(null, res, body, done);
  }
}
