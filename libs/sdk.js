//              ____  
//    _________/ / /__
//   / ___/ __  / //_/
//  (__  ) /_/ / ,<   
// /____/\__,_/_/|_|  
//
// @brief: a sdk factory, build sdks made easy
// @author: [turingou](http://guoyu.me)

var _ = require('lodash');
var apis = require('./action');

module.exports = SDK;

/**
*
* @host[String]: the host domain
* @routes[Object]: a object contains every route of the sdk, including its URL, method, and callback function
* @rules[Object]: a object contains rules which append or merged into query params.
*
**/
function SDK(host, routes, rules) {
  if (!routes || !host) return false;
  if (!(_.isObject(routes))) return false;
  this.host = host;
  this.routes = routes;
  this.rules = rules || null;
  if (this.rules) this.init();
}

/**
*
* Add a new rule to SDK instance
* @key[String]: the key word of this rule, may be `get`,`post` or `all`
* @value[Object]: the value of this rule, this very object will be merged in to query params,
* for instance, `qs` object will be merged into query string. and `form` object will be merged into post form.
*
**/
SDK.prototype.rule = function(key, value) {
  if (!key || !value) return false;
  if (!this.rules) this.rules = {}
  this.rules[key.toLowerCase()] = value;
  return this;
};


/**
*
* Init a SDK instance
* if there's no any available rules provied before ,
* this init function can be triggered by users and at any time they want.
*
**/
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