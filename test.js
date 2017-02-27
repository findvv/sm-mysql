var SMysql = require('./index.js')
var db = require('./src/config.js');
var sMysql = new SMysql(db);
sMysql
    .createTable('test7',{
        'uid' : {
            type: 'INT',
            length: 10,
            isNull: false,
            default: '1'
        },
        'name' : {
            type: 'VARCHAR',
            length: 10,
            isNull: true,
            default: 'zzx'
        }
    })
    .end(function(data){
        console.log(data[0]);
    });