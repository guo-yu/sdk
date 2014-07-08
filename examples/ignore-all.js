var api = require('./api');

module.exports = function() {
  // highlevel, ignore params and callback
  // => http://localhost:9999/demo/read
  api.read();
}