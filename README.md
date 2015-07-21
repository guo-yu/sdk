## ![logo](https://cdn1.iconfinder.com/data/icons/Real-Estate-png/65/Factory.png) sdk ![npm](https://badge.fury.io/js/sdk.png)

SDK factory, building SDK made easy.

SDK module provides a easy and fast way to build a collection of APIs. user would config api routes, define which params will be injected into query params, and custom a callback wrapper of each route. make it sample and easy to handle API as make codes more reuseful.

### Installation
````bash
$ npm install sdk
````

### Example
To run examples provided. Try:

```bash
$ npm run examples
```

Or check out:

```js
var SDK = require('sdk');

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
var api = new SDK('http://my-api-server.com', APIs, rules);
```
And use a API like this way:

```js
// => http://my-api-server.com/demo/read/123?b=2
var query = {
  name: 123,
  qs: {
    b: 2
  }
}

// Return a Promise instance
api.read(query).then({ body } => {
  console.log(body)
})
```

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
Copyright (c) 2013 turing &lt;o.u.turing@gmail.com&gt;

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
