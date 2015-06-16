"use strict";


var async = require("async");
var path = require("path");
var mustache = require("mustache");
var prependToFile = require("./prependToFile");


// Prepends the Less files specified in the Twitter Bootstrap package "@import" property
// to each Less file in the destination directory. In other words the Twitter Bootstrap package
// must have had its files already copied to the destination directory.
function prependImportsToLessFiles(twbPkg, destPkgPrefix, dest, callback) {
	var destPkgName = destPkgPrefix + twbPkg.name;

	// Grab the Less files from the Twitter Bootstrap package.
	var lessFiles = twbPkg.files.filter(function (file) {
		return file.substr(file.length - 5) === ".less";
	});

	if (lessFiles.length && Array.isArray(twbPkg.imports)) {
		var ctx = { destPkgPrefix: destPkgPrefix, dest: path.basename(dest) };
		// Render the Less import statements.
		var imports = twbPkg.imports.map(function (imprt) {
			return mustache.render(imprt, ctx);
		});
		imports = imports.join("\n") + "\n\n";

		// For each Less file in the destination directory we prepend the import statements.
		async.each(lessFiles, function (lessFile, done) {
			prependToFile(path.join(dest, destPkgName, lessFile), imports, done);
		}, callback);
	} else {
		process.nextTick(callback);
	}
}

module.exports = prependImportsToLessFiles;
