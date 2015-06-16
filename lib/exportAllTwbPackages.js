/*
	This module will convert all Twitter Bootstrap packages to
	Meteor packages and save them to the specified destination directory.
*/

"use strict";


var async = require("async");
var twbPackages = require("../bootstrap-packages.json");
var exportTwbPackage = require("./exportTwbPackage");


// Converts all Twitter Bootstrap packages to Meteor packages and saves them to dest.
// PackagePrefix is the prefix applied to the Twitter Bootstrap package name. This
// new name will be the Meteor package name.
//
// Example:
// exportAllTwbPackages("pacakges", "bootstrap-", cb);
//
// exportAllTwbPackages(dest, callback)
// exportAllTwbPackages(destPkgPrefix, dest, callback)
function exportAllTwbPackages(destPkgPrefix, dest, callback) {
	if (arguments.length === 2) {
		callback = dest;
		dest = destPkgPrefix;
		destPkgPrefix = "";
	}

	async.each(Object.keys(twbPackages), function (twbPkgName, cb) {
		exportTwbPackage(twbPkgName, destPkgPrefix, dest, cb);
	}, callback);
}

module.exports = exportAllTwbPackages;
