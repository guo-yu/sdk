var api = require('./api')

// highlevel, ignore params and callback
// => http://localhost:9999/demo/read
module.exports = function() {  
  api.read()
}