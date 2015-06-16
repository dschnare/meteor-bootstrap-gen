/*
	This module exopes a function that will convert all
	Windows path separators into Unix path separators.
	Returns a path with a trailing Unix separator.
*/

"use strict";


var path = require("path");


function toUnixPath(p) {
	if (p) {
		return path.normalize(p).replace(/\\/g, "/");
	}

	return p;
}

module.exports = toUnixPath;
