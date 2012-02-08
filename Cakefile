fs            = require 'fs'
exec          = require('child_process').exec
requirejsPath = 'node_modules/requirejs/bin/r.js'

task 'optimise', 'optimise the front-end', (options) ->
  exec 'node ' + requirejsPath + ' -o app.build.js', (error, stdout, stderr) ->
      if !error
          console.log stdout
      else throw error

task 'edge', 'edge build', (options) ->
    invoke 'optimise'
    return




