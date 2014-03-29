var url = require('url');
var request = require('request');
var utils = require('./utils');
var urlmaker = require('./url');

module.exports = function(host, route) {

  return function(params, callback) {
    var method = route.method || 'get';
    var cb = (utils.isFunction(params) && !callback) ? params : callback;
    var options = (params && utils.isObject(params)) ? params : {};

    options.url = url.resolve(host,
      method === 'get' ?
      urlmaker(route.url, options) :
      route.url
    );

    options.method = method;

    return request(options, cb);
  };

};