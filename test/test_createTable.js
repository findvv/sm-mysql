var SMysql = require('../index.js')
var db = require('../dbs/db2.js');
var sMysql = new SMysql(db,'feiji');
sMysql.createTable('jipiao',{
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
    'gotime' : {
        type: 'VARCHAR',
        length: 50,
        isNull: false
    },
    'backtime' : {
        type: 'VARCHAR',
        length: 50,
        isNull: false
    },
    'url' : {
        type: 'VARCHAR',
        length: 300,
        isNull: false
    }
}).end(function(data) {
    console.log(data[0]);
});