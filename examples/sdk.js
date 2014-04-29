var SDK = require('../index');

var sdk = new SDK('http://abc.com', {
  read: {
    url: '/demo/read/{{name}}'
  },
  update: {
    method: 'post',
    url: '/demo/update'
  }
});

// run demo
sdk.read({
  name: 123
}, function(err, res, body) {
  console.log(err);
  console.log(res.statusCode)
});