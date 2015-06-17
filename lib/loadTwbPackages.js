/*
	This module loads the Twitter Bootstrap packages .json file
	and normalizes it to have the it's own name as the property "name".
*/

"use strict";


var fs = require("fs");


function loadTwbPackages(jsonFileName, callback) {
	fs.readFile(jsonFileName, { encoding: "utf8" }, function(err, text) {
		if (err) {
			callback(err);
		} else {
			try {
				var json = JSON.parse(text)

				// Add "name" to each package for convenience.
				Object.keys(json).forEach(function (name) {
					json[name].name = name;
				});

				callback(null, json);
			} catch (error) {
				callback(error);
			}
		}
	});
}

module.exports = loadTwbPackages;
