var SMysql = require('./index.js')
var db = require('./src/config.js');
var sMysql = new SMysql(db);
sMysql
    .update({'password':'121'},{'name':'1','num':'111'})
    .end(function(data){
        // console.log(data);
    });