var api = require('./api');

module.exports = function() {
  // highlevel
  // => http://localhost:9999/demo/read/123?b=2
  api.read({
    name: 123,
    qs: {
      b: 2
    }
  }, function(err, res, body) {
    // console.log('fetch done');
  });
}