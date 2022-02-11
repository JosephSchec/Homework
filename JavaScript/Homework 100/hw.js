/*** 1 ***/
//console.log('HELLO WORLD');

/*** 2 ***/
/*let argv=process.argv;
let sum=0;
for (let i = 2; i < argv.length; i++) {
  sum+=Number(argv[i]);
}
console.log(sum);*/

/*** 3  ***/
/*const fs = require('fs')
const buffer = fs.readFileSync(process.argv[2]);
const howManyNewLine = buffer.toString().split('\n');
console.log(howManyNewLine.length - 1);*/

/*** 4 ***/
/*const fs = require('fs')
fs.readFile(process.argv[2],(err,file)=>{
const howManyNewLine = file.toString().split('\n');
console.log(howManyNewLine.length - 1);
});*/

/*** 5 ***/
const fs = require('fs')
const path = require('path')

const folder = process.argv[2]
const ext = '.' + process.argv[3]
fs.readdir(folder, (err, files) => {
    const f = files.filter(file => path.extname(file) === ext);
    f.forEach(f => console.log(f))
})

