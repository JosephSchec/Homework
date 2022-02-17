const fs = require('fs')
const path = require('path')
const http = require('http')
const map = require('through2-map')
const url = require('url')
/** Make It Modular */
/*module.exports =  (dir, filterStr, callback)=> {

  fs.readdir(dir,  (err, list)=> {
    if (err)
      return callback(err)
      
    list = list.filter( (file)=> path.extname(file) === '.' + filterStr);

    callback(null, list)
  })
}*/

/** Time Server */
/*const net = require('net')
function addZero(num) {
    return (num < 10 ? '0' : '') + num
}

function now() {
    const date = new Date()
    return date.getFullYear() + '-'
        + addZero(date.getMonth() + 1) + '-'
        + addZero(date.getDate()) + ' '
        + addZero(date.getHours()) + ':'
        + addZero(date.getMinutes())
}

net.createServer(socket => socket.end(now() + '\n')).listen(Number(process.argv[2]))*/

/**Http File Server */
/*http.createServer( (req, res)=> {
    fs.createReadStream(process.argv[3]).pipe(res)
}).listen(Number(process.argv[2]))*/

/** Http Upercaser */
/*http.createServer( (req, res)=> {
 if (req.method !== 'POST')
   return res.end('send me a POST\n')

 req.pipe(map( chunk=> {
   return chunk.toString().toUpperCase()
 })).pipe(res)
}).listen(Number(process.argv[2]))*/


/**Http JSON api server */
function parseTime(time) {
    return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
    }
}

function unixTime(time) {
    return { unixtime: time.getTime() }
}

http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const time = new Date(parsedUrl.query.iso)
    let result;
    if (parsedUrl.pathname === '/api/parsetime') {
        result = parseTime(time)
    }
    else if (parsedUrl.pathname === '/api/unixtime') {
        result = unixTime(time)
    }
    if (result) {
        res.end(JSON.stringify(result))
    } else {
        res.end()
    }
}).listen(Number(process.argv[2]))