var fs = require('fs')
var tgz = require('tar.gz')
var mkdirp = require('mkdirp')
var Path = require('path')
var glob = require('glob')
var async = require('async')
var rmrf = require('rmrf')
var bower = require('./bower')

var log = function() {
  console.log.apply(console, arguments)
}

var error = function() {
  console.error.apply(console, arguments)
}

module.exports = function() {

  var cwd = process.cwd()
  var modulePath = Path.join(cwd, '.components')
  var bowerComponentsPath = bower.dir(cwd)
  var sep = '-v'

  // ensure that the node_modules directory exists
  mkdirp.sync(bowerComponentsPath)

  async.eachSeries(glob.sync('*.tgz', {cwd:modulePath}), function(file, cb) {
    var archive = Path.join(modulePath, file)
    file = file.replace(/\.tgz$/i, '')
    var name = file.substring(0, file.lastIndexOf(sep))
    var version = file.substring(file.lastIndexOf(sep)+sep.length)

    // remove existing installed module
    if (fs.existsSync(Path.join(bowerComponentsPath, name))) {
      rmrf(Path.join(bowerComponentsPath, name))
    }

    // extract the module into node_modules
    new tgz().extract(archive, bowerComponentsPath, function(err) {
      if (!err) log('Extracted', name+'@'+version)
      else error(err)
      cb()
    })

  }, function() {
    log('\nDone!')
  })

}

