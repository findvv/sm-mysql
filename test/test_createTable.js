var SMysql = require('../index.js')
var db = require('../dbs/db2.js');
var sMysql = new SMysql(db,'laoma');
sMysql.createTable('feizan',{
    'name' : {
        type: 'VARCHAR',
        length: 50,
        isNull: false
    },
    'fangwen' : {
        type: 'INT',
        length: 20,
        isNull: false
    },
    'guanzhu' : {
        type: 'INT',
        length: 20,
        isNull: false
    },
    'fensi' : {
        type: 'INT',
        length: 20,
        isNull: false
    },
    'jifen' : {
        type: 'INT',
        length: 20,
        isNull: false
    },
    'face' : {
        type: 'VARCHAR',
        length: 100,
        isNull: false
    }
}).end(function(data) {
    console.log(data[0]);
});