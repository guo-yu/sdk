var api = require('./api')

// lowlevel
// => http://localhost:9999/anotherAPI?a=1
module.exports = function() {
  var query = {
    qs: {
      a: 1
    }
  }

  api.get('/anotherAPI', query)
    .then(function(result) {
      console.log(result)
    })
}