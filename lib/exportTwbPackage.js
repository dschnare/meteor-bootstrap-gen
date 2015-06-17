/*
	This module exports a Twitter Bootstrap package
	and writes it to dest.
*/

"use strict";


var async = require("async");
var copyTwbFiles = require("./copyTwbFiles");
var bootstrapPath = require("./bootstrapPath");
var prependImportsToLessFiles = require("./prependImportsToLessFiles");


//
// Example:
// exportTwbPackage("buttons", "dschnare", "bootstrap-", "pacakges", cb);
//
// exportTwbPackage(twbPkg, dest, callback)
// exportTwbPackage(twbPkg, meteorUser, destPkgPrefix, dest, callback)
function exportTwbPackage(twbPkg, meteorUser, destPkgPrefix, dest, callback) {
	if (arguments.length === 3) {
		callback = destPkgPrefix;
		dest = meteorUser;
		destPkgPrefix = "";
		meteorUser = "";
	}

	if (twbPkg) {
		async.series([
			copyTwbFiles.bind(undefined, bootstrapPath, twbPkg, meteorUser, destPkgPrefix, dest),
			prependImportsToLessFiles.bind(undefined, twbPkg, destPkgPrefix, dest),
		], callback);
	} else {
		process.nextTick(function () {
			callback(new Error("Bootstrap module " + twbPkgName + " not found."));
		});
	}
}

module.exports = exportTwbPackage;
