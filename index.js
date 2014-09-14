/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var loaderUtils = require("loader-utils");
module.exports = function() {};
module.exports.pitch = function(remainingRequest) {
	this.cacheable && this.cacheable();
	var query = loaderUtils.parseQuery(this.query);
	var nameParam = '';
	if(query.name) {
		nameParam = ", '" + query.name + "'";
	} else if(query.nameRegex) {
		var paths = remainingRequest.split('!');
		var path = paths[paths.length - 1];
		var name = path.match(query.nameRegex)[1];
		nameParam = ", '" + name + "'";
	}
	var result;
	if(query.lazy) {
		result = [
			"module.exports = function(cb) {\n",
			"	require.ensure([], function(require) {\n",
			"		cb(require(", JSON.stringify("!!" + remainingRequest), "));\n",
			"	}" + nameParam + ");\n",
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
			"}" + nameParam + ");"];
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
