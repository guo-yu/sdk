//              ____  
//    _________/ / /__
//   / ___/ __  / //_/
//  (__  ) /_/ / ,<   
// /____/\__,_/_/|_|  
//
// @brief: a sdk factory, build sdks made easy
// @author: [turingou](http://guoyu.me)

var api = require('./action'),
    _ = require('underscore');

var API = function(router, parent) {
    var self = this;
    if (parent) this.parent = parent;
    if (router) this.router = router;
    if (self.router && _.isObject(self.router)) {
        _.each(self.router, function(route, key) {
            API.prototype[key] = api(route, self);
        });
    }
}

module.exports = API;