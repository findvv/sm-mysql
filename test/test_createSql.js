var SMysql = require('../index.js')
var db = require('../dbs/db2.js');
var sMysql = new SMysql(db);
sMysql.createSql('tieba').end(function(data) {
    console.log(data[0]);
});