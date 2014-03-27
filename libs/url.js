var swig = require('swig');

module.exports = function(route, locals) {
  return swig.render(route, {
    locals: locals
  });
};