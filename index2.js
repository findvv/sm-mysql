// 'use strict';
var db = require('./src/config.js');
var mysql   = require('mysql');
var co = require('co');
function SMysql(config) {
    this.result = [];
    this.steps = [];
    this.config = config;
    this.connection = mysql.createConnection(config); 
    this.connection.connect();
}
SMysql.prototype.search = function(key,func){
    var that = this,
        connection = that.connection,
        args = arguments,
        realKey;


    if (!key) {
        connection.query(('select * from ' + that.config.table), function(err, rows, fields) {
            if (err) {
                func(err);
            } else {
                func(rows);
            }
        });
    }
}
SMysql.prototype.end = function(){
    this.connection.end();
}
var sMysql = new SMysql(db);


sMysql.search('', function(data){
    console.log(data);
});
sMysql.search('', function(data){
    console.log(data);
});
sMysql.end();
