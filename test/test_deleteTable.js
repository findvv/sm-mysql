var SMysql = require('../index.js');
var db = require('../dbs/db2.js');
var sMysql = new SMysql(db);
sMysql.deleteTable('aqi').end();