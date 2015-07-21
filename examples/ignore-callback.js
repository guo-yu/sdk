var api = require('./api');

// use abs uri
// and ignore params
module.exports = function() {
  api.google('Im a token, but we just ignore callback')
}