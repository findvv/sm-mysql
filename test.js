var SMysql = require('./index.js')
var db = require('./src/config.js');
var sMysql = new SMysql(db);
sMysql
    .createTable('test3')
    .end(function(data){
        console.log(data);
    });