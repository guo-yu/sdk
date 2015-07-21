var api = require('./api')

// highlevel, ignore params
// => http://localhost:9999/demo/read
module.exports = function() {
  api.read().then(function(result) {
    console.log(result)
  })
}