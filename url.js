var swig = require('swig');

module.exports = function(param, route) {
    return swig.render(route.url, {
        locals: param
    });
}