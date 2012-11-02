/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var loaderUtils = require("loader-utils");
module.exports = function() {
	this.cacheable && this.cacheable();
	this.clearDependencies && this.clearDependencies();
	var requireRequest = this.request;
	if(this.loaderType == "loader") {
		requireRequest = this.currentLoaders.slice(this.loaderIndex+1).join("!") + "!" + this.filenames[0];
	} else if(this.loaderType != "postLoader") {
		throw new Error("bundle-loader do not work as pre loader");
	}
	var query = loaderUtils.parseQuery(this.query);
	var result;
	if(query.lazy) {
		result = [
			"module.exports = function(cb) {\n",
			"	require.ensure([], function(require) {\n",
			"		cb(require(", null, "));\n",
			"	});\n",
			"}"];
		result[3] = JSON.stringify(requireRequest);
	} else {
		result = [
			"var cbs = [], \n",
			"	data;\n",
			"module.exports = function(cb) {\n",
			"	if(cbs) cbs.push(cb);\n",
			"	else cb(data);\n",
			"}\n",
			"require.ensure([], function(require) {\n",
			"	data = require(", null, ");\n",
			"	var callbacks = cbs;\n",
			"	cbs = null;\n",
			"	for(var i = 0, l = callbacks.length; i < l; i++) {\n",
			"		callbacks[i](data);\n",
			"	}\n",
			"});"];
		result[8] = JSON.stringify(requireRequest);
	}
	return result.join("");
}
module.exports.separable = true;

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