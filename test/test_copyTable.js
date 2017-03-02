var SMysql = require('../index.js')
var db1 = require('../dbs/db1.js');
var db2 = require('../dbs/db2.js');
SMysql.copyTable('aqi', db1, db2);
