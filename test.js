var SMysql = require('./index.js')
var db = require('./src/config.js');
var sMysql = new SMysql(db);
sMysql
    .search(['name','password'],{'name':'1'})
    .search(['name'],{'password':'21'})
    .search(['name','password'],{'password':'%21'})
    .end(function(data){
        console.log(data);
    });