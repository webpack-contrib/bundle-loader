/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function() {
	this.cacheable && this.cacheable();
	this.clearDependencies && this.clearDependencies();
	var loaderSign = this.request.indexOf("!");
	var requireRequest = this.request.substr(loaderSign); // including leading "!"
	var result = [
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