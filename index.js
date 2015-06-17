/*
	The main module that exposes the following API:

	exportAllTwbPackages(twbPackages, dest, callback)
	exportAllTwbPackages(twbPackages, meteorUser, destPkgPrefix, dest, callback)

	exportTwbPackage(twbPkg, dest, callback)
	exportTwbPackage(twbPkg, meteorUser, destPkgPrefix, dest, callback)
*/

"use strict";


var exportAllTwbPackages = require("./lib/exportAllTwbPackages");
var exportTwbPackage = require("./lib/exportTwbPackage");


module.exports = {
	exportAllTwbPackages: exportAllTwbPackages,
	exportTwbPackage: exportTwbPackage
};
