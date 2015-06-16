"use strict";


var async = require("async");
var exportTwbPackage = require("../lib/exportTwbPackage");
var exportAllTwbPackages = require("../lib/exportAllTwbPackages");


function getCliOptions(args) {
	var arg;
	var opts = { packages: [] };

	while (args.length) {
		arg = args.shift();
		// TODO: Add support for "--dest-pkg-prefix="
		if (arg.indexOf("--package=") === 0) {
			opts.packages.push.apply(opts.packages, arg.split("=").pop().replace(/'|"/g, "").split(','));
		} else {
			opts.destination = arg.replace(/'|"/g, "");
		}
	}

	return opts;
}

var args = process.argv.slice(2);
var opts = getCliOptions(args);

if (!opts.destination) {
	console.log("Expected destination directory.");
	process.exit(1);
}

if (opts.packages.length) {
	async.each(opts.packages, function (twbPkgName, done) {
		exportTwbPackage(twbPkgName, "bootstrap-", opts.destination, done);
	}, function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Done");
		}
	});
} else {
	exportAllTwbPackages("bootstrap-", opts.destination, function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Done");
		}
	});
}
