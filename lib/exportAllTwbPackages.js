/*
	This module will convert all Twitter Bootstrap packages to
	Meteor packages and save them to the specified destination directory.
*/

"use strict";


var async = require("async");
var twbPackages = require("../bootstrap-packages.json");
var exportTwbPackage = require("./exportTwbPackage");


// Converts all Twitter Bootstrap packages to Meteor packages and saves them to dest.
//
// Example:
// exportAllTwbPackages("dschnare", bootstrap-", "pacakges", cb);
//
// exportAllTwbPackages(dest, callback)
// exportAllTwbPackages(meteorUser, destPkgPrefix, dest, callback)
function exportAllTwbPackages(meteorUser, destPkgPrefix, dest, callback) {
	if (arguments.length === 2) {
		callback = destPkgPrefix;
		dest = meteorUser;
		destPkgPrefix = "";
		meteorUser = "";
	}

	async.each(Object.keys(twbPackages), function (twbPkgName, cb) {
		exportTwbPackage(twbPkgName, meteorUser, destPkgPrefix, dest, cb);
	}, callback);
}

module.exports = exportAllTwbPackages;
