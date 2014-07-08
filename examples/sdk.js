var sdk = require('../index');

// init api
var api = new sdk('http://localhost:9999', {
  read: {
    url: '/demo/read/{{name}}'
  },
  update: {
    method: 'post',
    url: '/demo/update'
  }
}).init();

// highlevel
// => http://localhost:9999/demo/read/123?b=2
api.read({
  name: 123,
  qs: {
    b: 2
  }
}, function(err, res, body) {
  console.log('fetch done');
});

// lowlevel
// => http://localhost:9999/anotherAPI?a=1
api.get('/anotherAPI', {
  qs: {
    a: 1
  }
}, function(err, res, body){
  console.log('fetch done');
});
