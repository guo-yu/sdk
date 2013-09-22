var api = require('beer'),
    _ = require('underscore'),
    urlmaker = require('./url');

module.exports = function(route, self) {
    return function(params, cb) {
        var parent = self.parent,
            method = route.method ? route.method : 'get',
            callback = (_.isFunction(params) && !cb) ? params : cb,
            data = (params && _.isObject(params)) ? params: {};
        api[method](parent.server + urlmaker(data, route), data, function(err, result) {
            callback(err, result, parent);
        });
    }
}