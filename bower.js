var fs = require('fs')
var Path = require('path');

var requireJSON = function(path) {
  return JSON.parse(fs.readFileSync(path, "utf8"))
}

exports.dir = function(rootPath) {
  var bowerConfig = Path.join(rootPath, '.bowerrc')
  var bowerDir = 'bower_components'
  if (fs.statSync(bowerConfig) && (directory = requireJSON(bowerConfig).directory)) {
    bowerDir = directory
  }
  return Path.join(rootPath, bowerDir)
}
