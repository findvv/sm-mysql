var SMysql = require('./index.js')
var db = require('./src/config.js');
var sMysql = new SMysql(db);
sMysql
    .del({
        'name': '123',
        'password': '123'
    })
    .end(function(data){
        // console.log(data);
    });