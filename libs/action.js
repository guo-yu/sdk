var url = require('url');
var _ = require('underscore');
var request = require('request');
var urlmaker = require('./url');

module.exports = function(host, route, rules) {

  return function(params, callback) {
    var method = route.method.toLowerCase() || 'get';
    var cb = (_.isFunction(params) && !callback) ? params : callback;
    var options = (params && _.isObject(params)) ? params : {};

    if (rules) {
      if (rules.all) options = _.extend(rules.all, options);
      options = _.extend(rules[method] || {}, options);
    }

    options.method = method;
    options.url = url.resolve(host, urlmaker(route.url, options));

    return request(options, cb);
  };

};