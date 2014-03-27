var swig = require('swig');

module.exports = function(locals, route) {
  return swig.render(route.url, {
    locals: locals
  });
};