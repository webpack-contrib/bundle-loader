/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var loaderUtils = require("loader-utils");

module.exports = function() {};
module.exports.pitch = function(remainingRequest) {
	this.cacheable && this.cacheable();
	var query = loaderUtils.parseQuery(this.query);
	var options = {
		context: query.context || this.options.context,
	};
	var chunkName = loaderUtils.interpolateName(this, query.name, options);
	var chunkNameParam = ", " + JSON.stringify(chunkName);
	var result;
	if(query.lazy) {
		result = [
			"module.exports = function(cb) {\n",
			"	require.ensure([], function(require) {\n",
			"		cb(require(", JSON.stringify("!!" + remainingRequest), "));\n",
			"	}" + chunkNameParam + ");\n",
			"}"];
	} else {
		result = [
			"var cbs = [], \n",
			"	data;\n",
			"module.exports = function(cb) {\n",
			"	if(cbs) cbs.push(cb);\n",
			"	else cb(data);\n",
			"}\n",
			"require.ensure([], function(require) {\n",
			"	data = require(", JSON.stringify("!!" + remainingRequest), ");\n",
			"	var callbacks = cbs;\n",
			"	cbs = null;\n",
			"	for(var i = 0, l = callbacks.length; i < l; i++) {\n",
			"		callbacks[i](data);\n",
			"	}\n",
			"}" + chunkNameParam + ");"];
	}
	return result.join("");
}

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
