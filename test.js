var SMysql = require('./index.js')
var db = require('./src/config.js');
var sMysql = new SMysql(db);
sMysql
    .deleteSql('test')
    .end(function(data){
        console.log(data[0]);
    });