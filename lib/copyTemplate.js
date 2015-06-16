/*
	This module will render a Mustache template and save it as destFile.
*/

"use strict";


var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");
var mustache = require("mustache");


function copyTemplate(tplFile, destFile, context, callback) {
	fs.readFile(tplFile, { encoding: "utf8" }, function (err, tpl) {
		if (err) {
			callback(err);
		} else {
			var txt = mustache.render(tpl, context);
			mkdirp(path.dirname(destFile), function (e) {
				if (e) {
					callback(e);
				} else {
					fs.writeFile(destFile, txt, { encoding: "utf8" }, callback);
				}
			});
		}
	});
}

module.exports = copyTemplate;
