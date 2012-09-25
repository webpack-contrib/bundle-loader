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
		"module.exports = function(cb) {\n",
		"	require.ensure([], function(require) {\n",
		"		cb(require(", null, "));\n",
		"	});\n",
		"}"];
	result[3] = JSON.stringify(requireRequest);
	return result.join("");
}
module.exports.seperable = true;

/*
Output format:

	module.exports = function(cb) {
		require.ensure([], function(require) {
			cb(require("xxx"));
		});
	}

*/