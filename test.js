var SMysql = require('./index.js')
var db = require('./src/config.js');
var sMysql = new SMysql(db);
sMysql
    .createSql('test8')
    .end(function(data){
        console.log(data[0]);
    });