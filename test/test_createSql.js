var SMysql = require('../index.js')
var db = require('../dbs/db1.js');
var sMysql = new SMysql(db,'weather');
sMysql.createSql('test').end(function(data) {
    console.log(data[0]);
});