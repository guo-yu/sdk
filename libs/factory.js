import url from 'url'
import _ from 'lodash'
import debug from 'debug'
import request from 'request'
import urlmaker from './url'

export function lowLevel(host, method, rules) {
  return (url, params, callback) => {
    if (!url) 
      return false

    return initRequest({
      host,
      url,
      method,
      rules,
    }, params, callback)
  }
}

export function highLevel(host, route, rules) {
  return (params, callback) => {
    return initRequest({
      host,
      rules,
      url: urlmaker(route.url, params || {}),
      method: route.method ? route.method.toLowerCase() : 'get',
    }, params, callback, (err, res, body, done) => {
      if (route.callback && _.isFunction(route.callback))
        return route.callback(err, res, body, done)

      return done(err, res, body)
    })
  }
}

function initRequest(opts, params, callback, next) {
  var rules = opts.rules;
  var done = retCallback(params, callback);
  var options = isObject(params) ? params : {};

  if (rules) {
    if (rules.all) 
      options = _.merge(_.cloneDeep(rules.all), options);
    if (rules[opts.method])
      options = _.merge(_.cloneDeep(rules[opts.method]), options);
  }

  options.url = isAbsUri(opts.url) ? 
    opts.url : url.resolve(opts.host, opts.url);

  options.method = opts.method

  if (options.json == undefined)
    options.json = true

  debug('sdk:request')(options)

  return request(options, defaultCallback)

  function defaultCallback(err, res, body) {
    var cb = next || done

    if (err) {
      debug('sdk:response:error')(err)
      return cb(err, res, null, done)
    }

    debug('sdk:response:status')(res.statusCode)
    debug('sdk:response:headers')(res['headers'])
    debug('sdk:response:body')(body)

    var code = res.statusCode
    if (code !== 200) 
      return cb(new Error(code), res, body, done)

    return cb(null, res, body, done)
  }
}

function retCallback(params, callback) {
  if (!params && !callback) 
    return emptyCallback
  if (_.isFunction(params) && !callback) 
    return params
  if (callback && _.isFunction(callback)) 
    return callback

  return emptyCallback;

  function emptyCallback(){}
}

function isObject(obj) {
  return obj && _.isObject(obj) && !_.isFunction(obj)
}

function isAbsUri(uri) {
  return uri && (uri.indexOf('http') === 0 || uri.indexOf('https') === 0)
}
