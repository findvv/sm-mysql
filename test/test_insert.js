var SMysql = require('../index.js')
var db = require('../dbs/db2.js');
var sMysql = new SMysql(db);
sMysql.createSql('weather').end(function(data) {
    console.log(data[0]);
});