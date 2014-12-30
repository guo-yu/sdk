var api = require('./api');

module.exports = function() {
  // use abs uri
  // and ignore params
  api.google('Im a token, but we just ignore callback');
}