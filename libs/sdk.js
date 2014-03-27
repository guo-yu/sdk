//              ____  
//    _________/ / /__
//   / ___/ __  / //_/
//  (__  ) /_/ / ,<   
// /____/\__,_/_/|_|  
//
// @brief: a sdk factory, build sdks made easy
// @author: [turingou](http://guoyu.me)

var _ = require('underscore');
var api = require('./action');

module.exports = API;

function API(router, parent) {
  var self = this;
  if (parent) self.parent = parent;
  if (router) self.router = router;
  if (self.router && _.isObject(self.router)) {
    _.each(self.router, function(route, key) {
      // 采用 API.prototype[key] 的方式会互相覆盖
      self[key] = api(route, self);
    });
  }
}