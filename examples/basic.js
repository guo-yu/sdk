var api = require('./api')

module.exports = function() {
  // highlevel
  // => http://localhost:9999/demo/read/123?b=2
  var query = {
    name: 123,
    qs: {
      b: 2
    }
  }

  api.read(query).then(function(result){
    console.log(result)
  })
}
