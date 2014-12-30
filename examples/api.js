var sdk = require('../index');

// APIs is a map with `shortcut` and request object,
// Which contains request.url, request.method.
var APIs = {
  // By default, the method is `GET`
  read: {
    url: '/example/read/{{name}}'
  },
  // Btw, String will be ok as well
  fetch: '/example/read/{{name}}',
  // Use `POST` instead
  update: {
    method: 'post',
    url: '/example/update'
  },
  // Absolute URI will not be joined to host URI.
  google: 'http://google.com'
};

// Rules is a map with a request.method as a key,
// Which contains a request.option object will be merged into a real request.
var rules = {
  // userId=303 will be inject to a real `GET` request 
  get: {
    qs: {
      userId: 303
    }
  },
  // token: 'abc' will be inject to a real `POST` request as form data.
  post: {
    form: {
      token: 'abc' 
    }
  }
}

// Init a new SDK instance with APIs and append some request rules to it.
var api = new sdk('http://localhost:9999', APIs, rules);

module.exports = api;
