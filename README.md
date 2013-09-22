## ![logo](https://cdn1.iconfinder.com/data/icons/Real-Estate-png/65/Factory.png) sdk ![npm](https://badge.fury.io/js/sdk.png)

a sdk factory, build sdks made easy. by [turing](https://npmjs.org/~turing) 

### Installation
````
$ npm install sdk
````

### Example
````javascript
var sdk = require('sdk');

// init a API
var demo = new sdk({
    read: {
        url: '/demo/read/{{name}}',
        method: 'get' // default method is 'get'
    },
    update: {
        url: '/demo/update',
        method: 'post'
    }
},{
    server: 'http://abc.com'
});

// run demo
// will send a GET request -> http://abc.com/demo/read/123
demo.read({
    name: 123
},function(err, result){
    console.log(err);
    console.log(result.response);
});
````

### API
check this file: `index.js`

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