/*
	This module exports a Twitter Bootstrap package
	and writes it to dest. The destination folder must exist.
*/

"use strict";


var async = require("async");
var copyTwbFiles = require("./copyTwbFiles");
var twbPackages = require("./bootstrapPackages.js");
var bootstrapPath = require("./bootstrapPath");
var prependImportsToLessFiles = require("./prependImportsToLessFiles");


// exportTwbPackage(twbPkgName, dest, callback)
// exportTwbPackage(twbPkgName, destPkgPrefix, dest, callback)
function exportTwbPackage(twbPkgName, destPkgPrefix, dest, callback) {
	if (arguments.length === 3) {
		callback = dest;
		dest = destPkgPrefix;
		destPkgPrefix = "";
	}

	var twbPkg = twbPackages[twbPkgName];

	if (twbPkg) {
		async.series([
			copyTwbFiles.bind(undefined, bootstrapPath, twbPkg, destPkgPrefix, dest),
			prependImportsToLessFiles.bind(undefined, twbPkg, destPkgPrefix, dest),
		], callback);
	} else {
		process.nextTick(function () {
			callback(new Error("Bootstrap module " + twbPkgName + " not found."));
		});
	}
}

module.exports = exportTwbPackage;
