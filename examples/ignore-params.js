var api = require('./api');

module.exports = function() {
  // highlevel, ignore params
  // => http://localhost:9999/demo/read
  api.read(function(err, res, body) {
    // console.log('fetch done');
  });
}