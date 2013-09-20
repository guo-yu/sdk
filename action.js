var api = require('beer'),
    urlmaker = require('./url'),
    _ = require('underscore');

module.exports = function(route, self) {
    return function(params, cb) {
        var parent = self.parent,
            method = route.method ? route.method : 'get',
            vars = params;
        if (route.headers && _.isObject(route.headers)) params.headers = route.headers;
        if (method === 'get') vars = params.query ? params.query : {};
        api[method](parent.server + urlmaker(params, route), vars, function(err, result) {
            cb(err, result, parent);
        });
    }
}