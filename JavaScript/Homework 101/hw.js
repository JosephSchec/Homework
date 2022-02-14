'use strict';
const http = require('http');
/*** 1  ***/

/*http.get(process.argv[2], response=> {
    response.setEncoding('utf8')
    response.on('data',data=> console.log(data))
    response.on('error', e=>console.error(e))
  });
*/

/*** 2 ***/

/*let body = ''
http.get(process.argv[2], response=>{
    response.on('data', chunk => body += chunk)
    response.on('end', () => {
        console.log(body.length);
        console.log(body);
    })
})
*/

/*** 3 ***/
const bl = require('bl');

let results = []
let count = 0
const [a, b, ...rest] = process.argv;

rest.forEach((arg, index) => {
    http.get(arg, response => {
        response.pipe(bl((err, data) => {
            results[index] = data.toString();
            count++;
            if (count === 3) {
                results.forEach(data => console.log(data))

            }
        }))
    })
})
