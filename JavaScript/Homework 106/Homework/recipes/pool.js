var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host: 'localhost',
  user: 'nodeUser',
  password: 'test123',
  database: 'nodeuser'
});
module.exports= pool;