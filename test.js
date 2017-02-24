var SMysql = require('./index.js')
var db = require('./src/config.js');
var sMysql = new SMysql(db);
sMysql
    .search(['name','password'],{'name':'1'})
    .search(['name'],{'name':'1'})
    .search(['name','password'],{'name':'3'})
    .end(function(data){
        console.log(data);
    });