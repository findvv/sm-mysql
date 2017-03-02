var SMysql = require('./index.js')
var db1 = require('./src/config.js');
var db2 = require('./src/config2.js');
var co = require('co');
var fs = require('fs');
var sMysql1 = new SMysql(db1);
var sMysql2 = new SMysql(db2);
function step1() {
    return new Promise(function(resolve, reject) {
        sMysql1
            .exportTable('movie')
            .end(function(data){
                resolve(data[0]);
            });
    });
}
function step2(data) {
    return new Promise(function(resolve, reject) {
        sMysql2
            .importTable('movie',data)
            .end(function(data){
                console.log(data[1]);
                resolve();
            });
    });
}
function *steps() {
    var data = yield step1();
    yield step2(data);
}
co(steps);
