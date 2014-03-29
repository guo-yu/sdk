//              ____  
//    _________/ / /__
//   / ___/ __  / //_/
//  (__  ) /_/ / ,<   
// /____/\__,_/_/|_|  
//
// @brief: a sdk factory, build sdks made easy
// @author: [turingou](http://guoyu.me)

var _ = require('underscore');
var apis = require('./action');

module.exports = SDK;

function SDK(host, routes, rules) {
  if (!routes || !host) return false;
  if (!(_.isObject(routes))) return false;
  this.host = host;
  this.routes = routes;
  this.rules = rules || null;
  if (this.rules) this.init();
}

SDK.prototype.rule = function(key, value) {
  if (!key || !value) return false;
  if (!this.rules) this.rules = {}
  this.rules[key.toLowerCase()] = value;
  return this.rules;
};

SDK.prototype.init = function() {
  var self = this;
  var routes = this.routes;
  var host = this.host;
  var rules = this.rules;
  Object.keys(routes).forEach(function(key) {
    var route = routes[key];
    var api = {}
    if (typeof(route) === 'string') {
      api.url = route;
    } else {
      if (!route.url) return false;
      api = route;
    }
    self[key] = apis(host, api, rules);
  });
}