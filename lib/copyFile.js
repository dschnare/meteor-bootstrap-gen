/*
  Convenience module that copies a file to new target destination.
  The destination directory will be created automatically if it doesn't exist.
  Reference: http://stackoverflow.com/questions/11293857/fastest-way-to-copy-file-in-node-js
*/

"use strict";


var path = require("path");
var fs = require("fs");
var mkdirp = require("mkdirp");


function copyFile(source, target, cb) {
  var cbCalled = false;

  mkdirp(path.dirname(target), function (err) {
    if (err) {
      done(err);
    } else {
      var rd = fs.createReadStream(source);
      rd.on("error", function(err) {
        done(err);
      });
      var wr = fs.createWriteStream(target);
      wr.on("error", function(err) {
        done(err);
      });
      wr.on("close", function(ex) {
        done();
      });
      rd.pipe(wr);
    }
  });

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

module.exports = copyFile;
