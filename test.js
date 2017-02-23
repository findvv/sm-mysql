var SMysql = require('./index.js')
var db = require('./src/config.js');
var sMysql = new SMysql(db);
sMysql
    .search(['name'])
    .search()
    .search(['password'])
    .search(['name','password'])
    .end(function(data){
      console.log(data[2]);
    });