//              ____
//    _________/ / /__
//   / ___/ __  / //_/
//  (__  ) /_/ / ,<
// /____/\__,_/_/|_|
//
// @brief: a sdk factory, build sdks made easy
// @author: [turingou](http://guoyu.me)

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _factory = require('./factory');

/**
 *
 * @host[String]: the host domain
 * @routes[Object]: a object contains every route of the sdk, including its URL, method, and callback function
 * @rules[Object]: a object contains rules which append or merged into query params.
 *
 **/

var SDK = (function () {
  function SDK(host, routes) {
    var rules = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

    _classCallCheck(this, SDK);

    if (!routes || !host) return;
    if (!_lodash2['default'].isObject(routes)) return;

    this.host = host;
    this.routes = routes;
    this.rules = rules;

    if (this.rules) this.init();
  }

  /**
   *
   * Add a new rule to SDK instance
   * @key[String]: the key word of this rule, may be `get`,`post` or `all`
   * @value[Object]: the value of this rule, this very object will be merged in to query params,
   * for instance, `qs` object will be merged into query string. and `form` object will be merged into post form.
   *
   **/

  _createClass(SDK, [{
    key: 'rule',
    value: function rule(key, value) {
      if (!key || !value) return false;
      if (!this.rules) this.rules = {};

      this.rules[key.toLowerCase()] = value;
      return this;
    }

    /**
     *
     * Init a SDK instance
     * if there's no any available rules provied before ,
     * this init function can be triggered by users and at any time they want.
     *
     **/
  }, {
    key: 'init',
    value: function init() {
      var _this = this;

      var host = this.host;
      var rules = this.rules;
      var routes = this.routes;

      // init build-in lowlevel apis
      ['get', 'post', 'put', 'delete'].forEach(function (method) {
        return _this[method] = (0, _factory.lowLevel)(host, method, rules);
      });

      // init custom apis
      Object.keys(routes).forEach(function (key) {
        var route = routes[key];
        var api = {
          url: typeof route === 'string' ? route : route.url
        };['method', 'callback'].forEach(function (item) {
          if (route[item]) api[item] = route[item];
        });

        _this[key] = (0, _factory.highLevel)(host, api, rules);
      });

      return this;
    }
  }]);

  return SDK;
})();

exports['default'] = SDK;
module.exports = exports['default'];
//# sourceMappingURL=sdk.js.map