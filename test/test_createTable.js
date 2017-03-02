var SMysql = require('../index.js')
var db = require('../dbs/db2.js');
var sMysql = new SMysql(db,'weather');
sMysql.createTable('aqi',{
    'time' : {
        type: 'VARCHAR',
        length: 20,
        isNull: false
    },
    'beijing' : {
        type: 'VARCHAR',
        length: 10,
        isNull: false
    },
    'hangzhou' : {
        type: 'VARCHAR',
        length: 10,
        isNull: false
    }

}).end(function(data) {
    console.log(data[0]);
});