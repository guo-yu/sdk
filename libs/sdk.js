//              ____  
//    _________/ / /__
//   / ___/ __  / //_/
//  (__  ) /_/ / ,<   
// /____/\__,_/_/|_|  
//
// @brief: a sdk factory, build sdks made easy
// @author: [turingou](http://guoyu.me)

var utils = require('./utils');
var apis = require('./action');

module.exports = SDK;

function SDK(host, routes) {
  if (!routes || !host) return false;
  if (!(utils.isObject(routes))) return false;
  var self = this;
  Object.keys(routes).forEach(function(key) {
    var route = routes[key];
    var api = {}
    if (typeof(route) === 'string') {
      api.url = route;
    } else {
      if (!route.url) return false;
      api = route;
    }
    self[key] = apis(host, api);
  });
}