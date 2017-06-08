/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
import loaderUtils from 'loader-utils';

export function pitch(remainingRequest) { // eslint-disable-line no-unused-vars
  const options = loaderUtils.getOptions(this) || {};

  let chunkNameParam = '';

  if (options.name) {
    const opts = {
      context: options.context || this.options.context,
      regExp: options.regExp,
    };
    const chunkName = loaderUtils.interpolateName(this, options.name, opts);
    chunkNameParam = `, ${JSON.stringify(chunkName)}`;
  }

  let result;
  if (options.async) {
    result = [
      'module.exports = function(cb) {\n',
      ' require.ensure([], function(require) {\n',
      '   cb(require(", loaderUtils.stringifyRequest(this, `!!${remainingRequest}`), "));\n',
      `    }${chunkNameParam});\n`,
      '}'];
  } else {
    result = [
      'var cbs = [], \n',
      ' data;\n',
      'module.exports = function(cb) {\n',
      ' if(cbs) cbs.push(cb);\n',
      ' else cb(data);\n',
      '}\n',
      'require.ensure([], function(require) {\n',
      ' data = require(", loaderUtils.stringifyRequest(this, `!!${remainingRequest}`), ");\n',
      ' var callbacks = cbs;\n',
      ' cbs = null;\n',
      ' for(var i = 0, l = callbacks.length; i < l; i++) {\n',
      '   callbacks[i](data);\n',
      ' }\n',
      `}${chunkNameParam});`];
  }
  return result.join('');
}

export default () => { };

/*
Output format:

  var cbs = [],
    data;
  module.exports = function(cb) {
    if(cbs) cbs.push(cb);
    else cb(data);
  }
  require.ensure([], function(require) {
    data = require("xxx");
    var callbacks = cbs;
    cbs = null;
    for(var i = 0, l = callbacks.length; i < l; i++) {
      callbacks[i](data);
    }
  });

*/
