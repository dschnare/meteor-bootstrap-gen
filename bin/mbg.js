#!/usr/bin/env node

"use strict";


var async = require("async");
var exportTwbPackage = require("../lib/exportTwbPackage");
var exportAllTwbPackages = require("../lib/exportAllTwbPackages");


function getCliOptions(args) {
	var arg;
	var opts = {
		meteorUser: "",
		pkgPrefix: "bootstrap-",
		packages: []
	};

	while (args.length) {
		arg = args.shift();

		if (arg.indexOf("--package=") === 0) {
			opts.packages.push.apply(opts.packages, arg.split("=").pop().replace(/'|"/g, "").split(','));
		} else if (arg.indexOf("--pkg-prefix=") === 0) {
			opts.pkgPrefix = arg.split("=").pop().replace(/'|"/g, "");
		} else if (arg.indexOf("--meteor-user=") === 0) {
			opts.meteorUser = arg.split("=").pop().replace(/'|"/g, "");
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
		exportTwbPackage(twbPkgName, opts.meteorUser, opts.pkgPrefix, opts.destination, done);
	}, function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Done");
		}
	});
} else {
	exportAllTwbPackages(opts.meteorUser, opts.pkgPrefix, opts.destination, function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Done");
		}
	});
}
