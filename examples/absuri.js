var api = require('./api');

module.exports = function() {
  // use abs uri
  // and ignore params
  api.google().then(function(result){
    console.log(result)
  }).catch(function(err){
    console.error(err)
  })
}