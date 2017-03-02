var SMysql = require('../index.js')
var db1 = require('../src/config1.js');
var db2 = require('../src/config2.js');
SMysql.copyTable('aqi', db1, db2);
