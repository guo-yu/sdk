var API = require('../index');

// init a API
var demo = new API({
    read: {
        url: '/demo/read/{{name}}'
    },
    update: {
        url: '/demo/update',
        method: 'post'
    }
},{
    server: 'http://abc.com'
});

// run demo
demo.read({
    name: 123
},function(err, result){
    // console.log(err);
    // console.log(result.response);
});