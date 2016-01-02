'use strict'
var http = require('http')
var minimist = require('minimist')
var url = require('url')

class Command {
  run (options) {
    return String(this.core(this.convertOptions(options)))
  }

  convertOptions (options) {
    return Object.keys(options).reduce((memo, key) => {
      memo[key] = String(options[key])
      return memo
    }, {})
  }
}

class Runner {
  constructor (command) {
    this.command = command
  }
}

class API extends Runner {
  constructor (command) {
    super(command)
    this.server = http.createServer(this.callback.bind(this))
  }

  options (req) {
    return url.parse(req.url, true).query
  }

  callback (req, res) {
    res.setHeader('content-type', 'text/plain')
    res.writeHead(200)
    res.end(`${this.command.run(this.options(req))}\n`)
  }

  close () {
    this.server.close()
  }

  run () {
    this.server.listen(3000)
  }
}

class CLI extends Runner {
  options () {
    var args = minimist(process.argv.slice(2))

    var options = Object.assign({}, args)
    delete options._
    return Command.prototype.convertOptions(options)
  }

  run () {
    console.log(this.command.run(this.options()))
  }
}

module.exports = { Command, Runner, API, CLI }
