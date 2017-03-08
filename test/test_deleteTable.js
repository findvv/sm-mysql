var SMysql = require('../index.js');
var db = require('../dbs/db2.js');
var sMysql = new SMysql(db,'feiji');
sMysql.deleteTable('jipiao').end(function(data){console.log(data[0]);});