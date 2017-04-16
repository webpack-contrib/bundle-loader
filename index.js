/*
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Tobias Koppers @sokra
 Modified version, created by Richard Scarrott @richardscarrott
 */

var loaderUtils = require("loader-utils");

module.exports = function() {};
module.exports.pitch = function(remainingRequest) {
	this.cacheable && this.cacheable();
	var query = loaderUtils.getOptions(this) || {};
	if(query.name) {
		var options = {
			context: query.context || this.options.context,
			regExp: query.regExp
		};
		var chunkName = loaderUtils.interpolateName(this, query.name, options);
		var chunkNameParam = ", " + JSON.stringify(chunkName);
	} else {
		var chunkNameParam = '';
	}
	var result;
	if(query.lazy) {
		result = [
			"module.exports = function(successCallback, errorCallback) {\n",
			"	require.ensure([], function() {\n",
			"		successCallback(require(", loaderUtils.stringifyRequest(this, "!!" + remainingRequest), "));\n",
			"	}, function() {\n",
			"		if (errorCallback) errorCallback.apply(this, arguments);\n",
			"	}" + chunkNameParam + ");\n",
			"};"];
	} else {
		result = [
			"var cbs,\n",
			"	data,\n",
			"	error = false;\n",
			"module.exports = function(successCallback, errorCallback) {\n",
			"	errorCallback = errorCallback || function() {};\n",
			"	if (data) {\n",
			"		successCallback(data);\n",
			"	} else {\n",
			"		if (error) {\n",
			"			// Try again.\n",
			"			requireBundle();\n",
			"		}\n",
			"		cbs.push({\n",
			"			success: successCallback,\n",
			"			error: errorCallback\n",
			"		});\n",
			"	}\n",
			"};\n",
			"function requireBundle() {\n",
			"	cbs = [];\n",
			"	require.ensure([], function() {\n",
			"		data = require(", loaderUtils.stringifyRequest(this, "!!" + remainingRequest), ");\n",
			"		for(var i = 0, l = cbs.length; i < l; i++) {\n",
			"			cbs[i].success(data);\n",
			"		}\n",
			"		error = false;\n",
			"		cbs = null;\n",
			"	}, function() {\n",
			"		for(var i = 0, l = cbs.length; i < l; i++) {\n",
			"			cbs[i].error();\n",
			"		}\n",
			"		error = true;\n",
			"		cbs = null;\n",
			"	}" + chunkNameParam + ");\n",
			"}\n",
			"requireBundle();"
		];
	}
	return result.join("");
};

/*
Output format:

	// lazy
	module.exports = function(successCallback, errorCallback) {
		require.ensure([], function() {\n",
			successCallback(require("xxx"));
		}, function() {
			if (errorCallback) errorCallback.apply(this, arguments);
		}, 'name');
	};

	// non-lazy...kind of dupes the __webpack_require__.e callback handling a little...
	var cbs,
	data,
	error = false;
	module.exports = function(successCallback, errorCallback) {
		errorCallback = errorCallback || function() {};
		if (data) {
			successCallback(data);
		} else {
			if (error) {
				// Try again.
				requireBundle();
			}
			cbs.push({
				success: successCallback,
				error: errorCallback
			});
		}
	};
	function requireBundle() {
		cbs = [];
		require.ensure([], function(require) {
			data = require("xxx");
			for(var i = 0, l = cbs.length; i < l; i++) {
				cbs[i].success(data);
			}
			error = false;
			cbs = null;
		}, function() {
			for(var i = 0, l = cbs.length; i < l; i++) {
				cbs[i].error();
			}
			error = true;
			cbs = null;
		});
	}
	requireBundle();

*/