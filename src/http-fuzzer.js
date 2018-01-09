const fuzzer = require('../')
const request = require('request')
const colors = require('colors')

let counter = 0

// TODO: create report file we can write after all runs has finished.

function runPosts (url, data, totalRuns, timeout, verbose) {
  counter++
  let remaining = totalRuns - counter
  if (remaining === 0) {
    return
  }

  let tmpTimeout = timeout * counter
  setTimeout(function () {
    var generator = fuzzer.mutate.object(data)
    let mutatedData = generator()
    if (verbose) {
      console.log('Mutated Data:\n', colors.cyan(JSON.stringify(mutatedData, '', 2)))
    }
    request.post(url, mutatedData, function (err, res, body) {
      if (err) {
        console.log(colors.red('ERROR', err))
      }
      if (!err) {
        // console.log(body)
        switch (res.statusCode) {
          case 200:
          case 201:
            console.log('HTTP request status:', colors.green(res.statusCode + ' (Remaining timeout: ' + timeout + 'ms runs: ' + remaining + ')'))
            break
          case 500:
            console.log(colors.red('SERVER ERROR'))
            console.log(colors.red('DATA:\n', JSON.stringify(mutatedData, '', 2)))
            break
          default:
            console.log('HTTP request status:', colors.yellow(res.statusCode + ' (Remaining timeout: ' + timeout + 'ms runs: ' + remaining + ')')) // mutatedData
        }
      }

      runPosts(url, data, totalRuns, timeout, verbose)
      // res.on('end', function () { })
      // res.on('data', function (e) { })
      // res.on('error', function (e) { })
    })
  }, tmpTimeout)
}

function runPatchs (url, data, totalRuns, timeout) {
  console.log('TODO: create patch runner')
}

module.exports = {runPosts, runPatchs}
