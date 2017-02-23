var SMysql = require('./index.js')
var db = require('./src/config.js');
var sMysql = new SMysql(db);
sMysql
    .del({
        'name': 'wyw'
    })
    .end(function(data){
      console.log(data[2]);
    });