var SMysql = require('../index.js')
var db = require('../dbs/db2.js');
var sMysql = new SMysql(db,'sql');
sMysql.insert('table',[{'name': 'test1','password': '12'},{'name': 'test2','password': '123'}]).end(function(data) {
    console.log(data[0]);
});