var SMysql = require('../index.js')
var db = require('../dbs/db2.js');
var sMysql = new SMysql(db,'music');
sMysql.createTable('wangyi',{
    'title' : {
        type: 'VARCHAR',
        length: 100,
        isNull: false
    },
    'url' : {
        type: 'VARCHAR',
        length: 100,
        isNull: false
    },
    'data' : {
        type: 'VARCHAR',
        length: 100,
        isNull: false
    },
    'oriUrl' : {
        type: 'VARCHAR',
        length: 100,
        isNull: false
    }
}).end(function(data) {
    console.log(data[0]);
});