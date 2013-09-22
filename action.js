var api = require('beer'),
    urlmaker = require('./url'),
    _ = require('underscore');

module.exports = function(route, self) {
    return function(params, cb) {
        var parent = self.parent,
            method = route.method ? route.method : 'get',
            raw = (params && _.isObject(params)) ? params: {},
            vars = raw;
        if (method === 'get') vars = params.query ? params.query : {};
        if (route.headers && _.isObject(route.headers)) vars.headers = route.headers;
        api[method](parent.server + urlmaker(raw, route), vars, function(err, result) {
            cb(err, result, parent);
        });
    }
}