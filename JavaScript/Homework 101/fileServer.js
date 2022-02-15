'use strict';
const http = require('http');
const fs = require('fs');


http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html')

    if (req.url === '/') {
        res.writeHead(301, ['Location', '/index.html'])
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        try {
            const fileContent = fs.createReadStream(`./public${req.url}`, 'utf-8');
            let i = 0;
            //fileContent.on("error", e => console.error(e))
            return fileContent.on('data', chunk => {
               return res.write(`${chunk}  <h2> CHUNK # ============>  ${++i} </h2>`);
            });

        } catch (e) {
            switch (e.code) {
                case 'ENOENT':
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write('<h1>404 File Not Found</h1>');
                    break;
                default:
                    res.statusCode = 500;
                    res.write(`Internal Server Error. Unable to get ${req.url}`);
            }
        }
    }

    res.end();
}).listen(80)