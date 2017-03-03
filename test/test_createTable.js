var SMysql = require('../index.js')
var db = require('../dbs/db2.js');
var sMysql = new SMysql(db,'movie');
sMysql.createTable('douban',{
    'id' : {
        type: 'VARCHAR',
        length: 10,
        isNull: false
    },
    'title' : {
        type: 'VARCHAR',
        length: 30,
        isNull: false
    },
    'rate' : {
        type: 'VARCHAR',
        length: 10,
        isNull: false
    },
    'img' : {
        type: 'VARCHAR',
        length: 100,
        isNull: false
    }
}).end(function(data) {
    console.log(data[0]);
});