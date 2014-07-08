var api = require('./api');

module.exports = function() {
  // lowlevel
  // => http://localhost:9999/anotherAPI?a=1
  api.get('/anotherAPI', {
    qs: {
      a: 1
    }
  }, function(err, res, body) {
    // console.log('fetch done');
  });
}