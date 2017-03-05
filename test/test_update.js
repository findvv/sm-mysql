var SMysql = require('../index.js')
var db = require('../dbs/db2.js');
var sMysql = new SMysql(db,'weather');
sMysql.update('table',{'password':'121'},{'name':'1234','num':'111'}).end()