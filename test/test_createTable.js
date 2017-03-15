var SMysql = require('../index.js')
var db = require('../dbs/db2.js');
var sMysql = new SMysql(db,'manhua');
sMysql.createTable('haizeiwang',{
    'title' : {
        type: 'VARCHAR',
        length: 100,
        isNull: false
    },
    'imgs' : {
        type: 'VARCHAR',
        length: 5000,
        isNull: false
    }
}).end(function(data) {
    console.log(data[0]);
});