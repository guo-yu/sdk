import url from 'url'
import _ from 'lodash'
import debug from 'debug'
import Promise from 'bluebird'
import request from 'request'
import urlmaker from './url'

export function lowLevel(host, method, rules) {
  return (url, params={}) => {
    // Return a Promise/A+
    return initRequest({
      host,
      url,
      method,
      rules,
    }, params)
  }
}

export function highLevel(host, { url, method, callback }, rules) {
  return (params={}) => {
    // Return a Promise/A+
    return initRequest({
      host,
      rules,
      url: urlmaker(url, params),
      method: method ? method.toLowerCase() : 'get',
    }, params, callback)
  }
}

function initRequest(opts, params, middleware) {
  var rules = opts.rules
  var options = isObject(params) ? params : {}

  if (rules) {
    if (rules.all) 
      options = _.merge(_.cloneDeep(rules.all), options)
    if (rules[opts.method])
      options = _.merge(_.cloneDeep(rules[opts.method]), options)

    if (options.headers) {
      Object.keys(options.headers).forEach(k => {
        if (typeof(options.headers[k]) === 'function')
          options.headers[k] = options.headers[k]()
      })
    }
  }

  options.method = opts.method
  options.url = isAbsUri(opts.url) ? 
    opts.url : url.resolve(opts.host, opts.url);

  if (options.json == undefined)
    options.json = true

  debug('sdk:request')(options)

  return new Promise((Resolve, Reject) => {
    return request(options, (err, response, body) => {
      if (err)
        return Reject(err)

      debug('sdk:response:status')(response.statusCode)
      debug('sdk:response:headers')(response.headers)
      debug('sdk:response:body')(body)

      var code = response.statusCode
      if (code >= 400) 
        return Reject(new Error(code))

      if (_.isFunction(middleware)) {
        return middleware(response, body, (customError, customBody) => {
          if (customError)
            return Reject(customError)

          return Resolve({
            code,
            response,
            body: customBody || body
          })
        })
      }

      return Resolve({
        code,
        response,
        body
      })
    })
  })
}

function isObject(obj) {
  return obj && _.isObject(obj) && !_.isFunction(obj)
}

function isAbsUri(uri) {
  return uri && (uri.indexOf('http') === 0 || uri.indexOf('https') === 0)
}
