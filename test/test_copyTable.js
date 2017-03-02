var SMysql = require('../index.js');
var extend = require('extend');
var db1 = require('../dbs/db1.js');
var db2 = require('../dbs/db2.js');
SMysql.copyTable('aqi', extend(db1,{database:'weather'}), extend(db2,{database:'weather'}));
