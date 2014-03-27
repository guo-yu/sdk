exports.isFunction = isFunction;
exports.isObject = isObject;

function isFunction(fn) {
  return fn && fn instanceof Function;
}

function isObject(fn) {
  return fn && fn instanceof Object && typeof(fn) === 'object';
}