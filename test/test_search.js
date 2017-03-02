var SMysql = require('../index.js')
var db = require('../dbs/db2.js');
var sMysql = new SMysql(db);
sMysql.search('aqi').end(function(data) {
    console.log(data[0]);
});