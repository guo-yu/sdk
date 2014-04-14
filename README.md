## ![logo](https://cdn1.iconfinder.com/data/icons/Real-Estate-png/65/Factory.png) sdk ![npm](https://badge.fury.io/js/sdk.png)

a sdk factory, build sdks made easy.

SDK provides a easy and fast way to build a collection of APIs. user would config api routes, define which params will be injected into query params, and custom a callback wrapper of each route. make it sample and easy to handle API as make codes more reuseful.

### Installation
````
$ npm install sdk
````

### Example
````javascript
var sdk = require('sdk');

// init a API
var MySdk = new sdk('http://myApiServer.com', {
  // default method is 'get'
  query: '/demo/query',
  // or define selected method
  read: {
    url: '/demo/read/{{name}}',
    method: 'get'
  },
  update: {
    url: '/demo/update',
    method: 'post'
  }
});

// will send a GET request -> 
// http://myApiServer.com/demo/read/alice?before=1567
MySdk.read({
  name: 'alice',
  qs: {
    before: 1567
  }
},function(err, res, body) {
  if (err) throw err;
  console.log(body);
});
````

### API

#### new SDK(host, routes, rules)

- @host[String]: the host domain
- @routes[Object]: a object contains every route of the sdk, including its URL, method, and callback function
- @rules[Object]: a object contains rules which append or merged into query params.

#### SDK#rule(key, value)
Add a new rule to SDK instance

- @key[String]: the key word of this rule, may be `get`,`post` or `all`
- @value[Object]: the value of this rule, this very object will be merged in to query params,
- for instance, `qs` object will be merged into query string. and `form` object will be merged into post form.

#### SDK#init()
Init a SDK instance

- if there's no any available rules provied before ,
- this init function can be triggered by users and at any time they want.

### Contributing
- Fork this repo
- Clone your repo
- Install dependencies
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Open a pull request, and enjoy <3

### MIT license
Copyright (c) 2013 turing

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---
![docor](https://cdn1.iconfinder.com/data/icons/windows8_icons_iconpharm/26/doctor.png)
generated using [docor](https://github.com/turingou/docor.git) @ 0.1.0. brought to you by [turingou](https://github.com/turingou)