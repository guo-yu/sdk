var api = require('beer');
var _ = require('underscore');
var urlmaker = require('./url');

module.exports = function(route, self) {
  return function(params, cb) {
    var parent = self.parent;
    var method = route.method ? route.method : 'get';
    var callback = (_.isFunction(params) && !cb) ? params : cb;
    var data = (params && _.isObject(params)) ? params : {};
    api[method](parent.server + urlmaker(data, route), data, function(err, result) {
      callback(err, result, parent);
    });
  };
};