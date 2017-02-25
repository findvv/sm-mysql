var SMysql = require('./index.js')
var db = require('./src/config.js');
var sMysql = new SMysql(db);
sMysql
    .add({'nu': 1,'name': 'zzx','address': 'beijing'})
    .search()
    .search()
    .end(function(data){
        console.log(data[0]);
    });