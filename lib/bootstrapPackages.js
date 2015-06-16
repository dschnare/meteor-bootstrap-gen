/*
	This module loads the bootstrap-packages.json file
	from the root of the project and normalizes it to have the
	following API:

	{
		name: "package name",
		containsLess: true|false,
		containsJs: true|false,
		files: [{path, basename, toString}],
		lessFiles: [{path, basename, toString}],
		jsFiles: [{path, basename, toString}],
		@imports: [{options, basename, toString}],
		generateLessImports: function (prefix[, basenames])
	}

	Where the Array of objects making up files, lessFile and jsFiles
	have their toString() method return the path property.

	The Array of objects making up @imports has their toString() method
	return the basename property.

	The method generateLessImports() can optionally take an Array of basenames
	of the form {options, basename, toString} (i.e. same format as the @imports property).

	#############

	The format of the JSON file is expected to be of the following format:

	{
		"bootstrap-package-name": {
			"file": [
				"list of files (relative) to the bootstrap driectory"
			],
			"@imports": {
				"bootstrap-package-name": "@none" | null | "@all" | ["list of Less files to import from package"]
			},
			"deps": [
				"list of bootstrap package names that this package depends on"
			]
		}
	}

	Example:
	{
		"variables": {
			"files": [
				"less/variables.less"
			]
		},
		"mixins": {
			"files": [
				"less/mixins/hide-text.less",
				"less/mixins/opacity.less",
				"less/mixins/image.less",
				"less/mixins/labels.less",
				"less/mixins/reset-filter.less",
				"less/mixins/resize.less",
				"less/mixins/responsive-visibility.less",
				"less/mixins/size.less",
				"less/mixins/tab-focus.less",
				"less/mixins/text-emphasis.less",
				"less/mixins/text-overflow.less",
				"less/mixins/vendor-prefixes.less",

				"less/mixins/alerts.less",
				"less/mixins/buttons.less",
				"less/mixins/panels.less",
				"less/mixins/pagination.less",
				"less/mixins/list-group.less",
				"less/mixins/nav-divider.less",
				"less/mixins/forms.less",
				"less/mixins/progress-bar.less",
				"less/mixins/table-row.less",

				"less/mixins/background-variant.less",
				"less/mixins/border-radius.less",
				"less/mixins/gradients.less",

				"less/mixins/clearfix.less",
				"less/mixins/center-block.less",
				"less/mixins/nav-vertical-align.less",
				"less/mixins/grid-framework.less",
				"less/mixins/grid.less"
			],
			"@imports": {
				"variables": "@all"
			},
			"deps": [
				"variables"
			]
		},
		"base": {
			"files": [
				"less/normalize.less",
				"less/scaffolding.less",
				"less/utilities.less",
				"less/responsive-utilities.less"
			],
			"@imports": {
				"variables": "@all",
				"mixins": "@all"
			},
			"deps": [
				"variables",
				"mixins"
			]
		},
		"affix": {
			"files": [
				"js/affix.js"
			],
			"deps": [
				"base"
			]
		},
		"alerts": {
			"files": [
				"less/alerts.less",
				"js/alert.js"
			],
			"@imports": {
				"variables": "@all",
				"mixins": "@all"
			},
			"deps": [
				"base",
				"transition"
			]
		}
	}

	The "@imports" property determines what Less files of the dependent packages
	will be imported by the Less files of the parent package. In the example above
	"less/alerts.less" will have all the Less files that are part of the variables and
	mixins packages imported.

	You can also specify what specific Less files to import and any Less import options.

	Example:
	{
		...
		"navs": {
			"files": [
				"less/navs.less"
			],
			"@imports": {
				"variables": "@all",
				"mixins": "@all",
				"base": ["(reference) utilities.less"]
			},
			"deps": [
				"base"
			]
		}
		...
	}

	In this example the base package is a dependency but utilities.less
	is imported as a reference so that the output CSS will not contain
	any selectors from utilities.less unless the selectors are extended or mixed in.

	See: http://lesscss.org/features/#import-options
*/

"use strict";


var path = require("path");
var packages = require("../bootstrap-packages.json");


// Add "name" to each package for convenience.
Object.keys(packages).forEach(function (name) {
	packages[name].name = name;
});

module.exports = packages;
