/*
	This module will copy all files in a Twitter Bootstrap's
	files and copy globs to the specified destination. Renders
	Mustache templates for files from the copy globs with
	".mustache" in the file name. The ".mustache" string will
	be removed when saving the file to the Meteor package.
*/

"use strict";


var glob = require("glob");
var mkdirp = require("mkdirp");
var async = require("async");
var path = require("path");
var copyFile = require("./copyFile");
var copyTemplate = require("./copyTemplate");
var toUnixPath = require("./toUnixPath");
var bootstrap = require("bootstrap/package.json");


function isTemplate(value) {
	return typeof value === "string" && value.indexOf(".mustache") > 0;
}

// Copies all the files from a Twitter Bootstrap package to dest.
// The destination folder will be created if it doesn't exist.
//
// Example:
//	copyTwbFiles("node_modules/bootstrap", affixPkg, "bootstrap-", "packages", cb);
//
// This example will generate a Twitter Bootstrap package for the affix pacakge
//  and save it in pacakges/bootstrap-affix.
//
// copyTwbFiles(twbPath, twbPkg, meteorUser, destPkgPrefix, dest, callback)
function copyTwbFiles(twbPath, twbPkg, meteorUser, destPkgPrefix, dest, callback) {
	var destPkgName = destPkgPrefix + twbPkg.name;

	async.series([
		mkdirp.bind(undefined, dest),
		function (cb) {
			// Context used for templates.
			var ctx = { meteorUser:meteorUser, pkg: twbPkg, bootstrap: bootstrap, destPkgPrefix: destPkgPrefix };
			async.map(twbPkg.copy, function (globPattern, done) {
				globPattern = toUnixPath(globPattern);
				glob(globPattern, { cwd: twbPath }, done);
			}, function (err, result) {
				if (err) {
					cb(err);
				} else {
					var globbedFiles = [];

					// Flatten the results to a single array.
					result.forEach(function (array) {
						globbedFiles.push.apply(globbedFiles, array);
					});

					// Copy the files and the globbed files.
					// Templates are rendered before copying.
					async.each(twbPkg.files.concat(globbedFiles), function (file, done) {
						var srcFile = path.join(twbPath, file);
						var destFile;

						if (isTemplate(file)) {
							// Templates don't have their directories preserved when copying.
							// Always goes to the root of the destination package.
							destFile = path.join(dest, destPkgName, path.basename(file));
							// Remove the ".mustache" from the template file name when copying.
							destFile = destFile.replace(".mustache", "");
							copyTemplate(srcFile, destFile, ctx, done);
						} else {
							destFile = path.join(dest, destPkgName, file);
							copyFile(srcFile, destFile, done);
						}
					}, cb);
				}
			});
		}
	], callback);
}

module.exports = copyTwbFiles;
