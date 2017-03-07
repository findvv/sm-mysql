var SMysql = require('../index.js')
var db = require('../dbs/db1.js');
var sMysql = new SMysql(db,'feiji');
sMysql.createTable('qunaer2',{
    'price' : {
        type: 'INT',
        length: 10,
        isNull: false
    },
    'city' : {
        type: 'VARCHAR',
        length: 10,
        isNull: false
    },
    'airCode' : {
        type: 'VARCHAR',
        length: 10,
        isNull: false
    },
    'time' : {
        type: 'VARCHAR',
        length: 20,
        isNull: false
    }
}).end(function(data) {
    console.log(data[0]);
});