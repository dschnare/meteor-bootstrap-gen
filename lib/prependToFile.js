/*
	Convenience module that prepends header text to a file.
*/

"use strict";


var fs = require("fs");


// Prepends the specified header text to the file.
//
// Example:
// prependToFile("main.less", "@import \"variables.less\";\n\n", cb);
//
// prependToFile(file, header, callback)
function prependToFile(file, header, callback) {
	if (header) {
		fs.readFile(file, { encoding: "utf8" }, function (err, text) {
			if (err) {
				callback(err);
			} else {
				text = header + text;
				fs.writeFile(file, text, { encoding: "utf8" }, callback);
			}
		});
	} else {
		process.nextTick(callback);
	}
}

module.exports = prependToFile;
