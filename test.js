var SMysql = require('./index.js')
var db = require('./src/config.js');
var fs = require('fs');
var sMysql = new SMysql(db);
sMysql
    .exportTable('aqi')
    .end(function(data){
        console.log(data[0]);
        //fs.writeFile('result.md', JSON.stringify(data[0]), 'utf-8');
    });
