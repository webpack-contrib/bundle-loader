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
			context: query.context || this.rootContext || this.options && this.options.context,
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
			"module.exports = function(cb, err) {",
			"	require.ensure([], function() {",
			"		cb(require(", loaderUtils.stringifyRequest(this, "!!" + remainingRequest), "));",
			"	}, function() {",
			"		if (err) err.apply(this, arguments);",
			"	}" + chunkNameParam + ");",
			"};"];
	} else {
		result = [
			"var cbs,",
			"	data,",
			"	error = false;",
			"module.exports = function(cb, err) {",
			"	err = err || function() {};",
			"	if (data) {",
			"		cb(data);",
			"	} else {",
			"		if (error) {",
			"			// Try again.",
			"			requireBundle();",
			"		}",
			"		cbs.push({",
			"			success: cb,",
			"			error: err",
			"		});",
			"	}",
			"};",
			"function requireBundle() {",
			"	cbs = [];",
			"	require.ensure([], function() {",
			"		data = require(", loaderUtils.stringifyRequest(this, "!!" + remainingRequest), ");",
			"		for(var i = 0, l = cbs.length; i < l; i++) {",
			"			cbs[i].success(data);",
			"		}",
			"		error = false;",
			"		cbs = null;",
			"	}, function() {",
			"		for(var i = 0, l = cbs.length; i < l; i++) {",
			"			cbs[i].error();",
			"		}",
			"		error = true;",
			"		cbs = null;",
			"	}" + chunkNameParam + ");",
			"}",
			"requireBundle();"
		];
	}
	return result.join("\n");
};

/*
Output format:

	// lazy
	module.exports = function(cb, err) {
		require.ensure([], function() {",
			cb(require("xxx"));
		}, function() {
			if (err) err.apply(this, arguments);
		}, 'name');
	};

	// non-lazy...kind of dupes the __webpack_require__.e callback handling a little...
	var cbs,
	data,
	error = false;
	module.exports = function(cb, err) {
		err = err || function() {};
		if (data) {
			cb(data);
		} else {
			if (error) {
				// Try again.
				requireBundle();
			}
			cbs.push({
				success: cb,
				error: err
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