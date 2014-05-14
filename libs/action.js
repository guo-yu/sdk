var url = require('url');
var _ = require('lodash');
var request = require('request');
var urlmaker = require('./url');

function defaultCallback(err, response, body, next) {
  if (err) return next(err);
  var code = response.statusCode;
  if (code !== 200) return next(new Error(code), response);
  return next(null, response, body);
}

module.exports = function(host, route, rules) {

  return function(params, callback) {
    var method = route.method ? route.method.toLowerCase() : 'get';
    var done = (_.isFunction(params) && !callback) ? params : callback;
    var options = (params && _.isObject(params)) ? params : {};

    if (rules) {
      if (rules.all) options = _.merge(rules.all, options);
      options = _.merge(rules[method] || {}, options);
    }

    options.method = method;
    options.url = url.resolve(host, urlmaker(route.url, options));
    options.json = true;

    return request(options, function(err, response, body) {
      return defaultCallback(err, response, body, function(err, res, body) {
        if (route.callback && _.isFunction(route.callback)) {
          return route.callback(err, res, body, done);
        }
        return done(err, res, body);
      });
    });
  };

};