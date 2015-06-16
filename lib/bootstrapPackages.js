/*
	This module loads the bootstrap-packages.json file
	from the root of the project and normalizes it to have the
	it's own name as the property "name".

	The format of the JSON file is expected to be of the following format:

	{
		"bootstrap-package-name": {
			"files": [
				"list of files to copy to Meteor package and add to api.use() (relative to the bootstrap driectory)"
			],
			"imports": {
				"bootstrap-package-name": "@none" | null | "@all" | ["list of Less files to import from package"]
			},
			"copy": [
				"globs of files to copy to Meteor package (relative to bootstrap directory)"
			],
			"deps": [
				"list of bootstrap package names that this package depends on"
			]
		}
	}

	The "files" property contains a list of files that will be copied
	to the Meteor package and added to an "api.use(file, 'client')" call.

	The "imports" property contains a list of statements to prepend to each Less file
	listed in the "files" property. Typically these statements are @imports, but can be any valid Less.

	The "copy" property contains a list of glob patterns of files that will be copied
	to the Meteor package. If a file contains ".mustache" (will be removed when saving)
	it will be rendered as a Mustache template with the following context:

		{ meteorUser, pkg, bootstrap, destPkgPrefix }

	Where "meteorUser" is the value passed in from "--meteor-user",
	"pkg" is the Twitter Bootstrap object from the bootstrap-packages.json file,
	"bootstrap" is the loaded Twitter Bootstrap package.json file (typically used for
	version info) and "destPkgPrefix" is the valeu passed in from "--pkg-prefix".
*/

"use strict";


var path = require("path");
var packages = require("../bootstrap-packages.json");


// Add "name" to each package for convenience.
Object.keys(packages).forEach(function (name) {
	packages[name].name = name;
});

module.exports = packages;
