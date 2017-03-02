var SMysql = require('./index.js')
var db = require('./src/config2.js');
var sMysql = new SMysql(db);
sMysql.deleteTable('movie').end(function(){})