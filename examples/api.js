var sdk = require('../index');

// init api
var fakehost = 'http://localhost:9999';
var apis = {
  // by default, the mothod is `get`
  read: {
    url: '/demo/read/{{name}}'
  },
  // btw, string will be ok as well
  anotherRead: '/demo/read/{{name}}',
  // use post
  update: {
    method: 'post',
    url: '/demo/update'
  },
  // abs uri will not be joined to host uri.
  baidu: 'http://baidu.com'
};

var api = new sdk('http://localhost:9999', apis);
api.init();

module.exports = api;
