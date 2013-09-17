var api = require('beer'),
    urlmaker = require('./url'),
    _ = require('underscore');

module.exports = function(route, self) {
    return function(params, cb) {
        var parent = self.parent,
            method = route.method ? route.method : 'get';
        if (route.headers && _.isObject(route.headers)) params.headers = route.headers;
        api[method](parent.server + urlmaker(params, route), params, function(err, result) {
            cb(err, result);
        });
    }
}