var SMysql = require('../index.js')
var db = require('../dbs/db1.js');
var sMysql = new SMysql(db,'music');
sMysql.search('wangyi').end(function(data) {
    console.log(data[0]);
});