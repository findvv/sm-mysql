var SMysql = require('./index.js')
var db1 = require('./src/config.js');
var db2 = require('./src/config2.js');
SMysql.copyTable('movie', db1, db2, function(data){
    console.log(data);
});
