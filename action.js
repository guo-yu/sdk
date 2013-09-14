var api = require('beer'),
    urlmaker = require('./url');

module.exports = function(route, self) {
    return function(params, cb) {
        var parent = self.parent;
        api[route.method](parent.server + urlmaker(params, route), params, function(err, result) {
            cb(err, result);
        });
    }
}