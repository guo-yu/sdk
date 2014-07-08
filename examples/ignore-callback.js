var api = require('./api');

module.exports = function() {
  // use abs uri
  // and ignore params
  api.baidu('im a token, but we just ignore callback');
}