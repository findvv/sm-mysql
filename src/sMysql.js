'use strict';
var all = require('./all.js');
var mysql   = require('mysql');
var co = require('co');
var extend = require('extend');
function SMysql(config, db) {
    var obj = db ? extend(config,{'database':db}) : config;
    this.config = config;
    this.result = [];
    this.steps = [];
    this.startNum = 0;
    this.connection = mysql.createConnection(obj); 
    this.connection.connect();
}
SMysql.prototype = all;
SMysql.prototype.end = function(func) {
    var that = this;

    function *test() {
        for(var step of that.steps) {
            yield (function(){
                return new Promise(function(resolve, reject) {
                    that[step.name].call(that, step.args, resolve);
                });
            })();
        }
    }
    co(test).then(function(){
        func && func(that.result)
        that.connection.end();
    })
}
SMysql.copyTable = function(table,sql1,sql2,callback){
    var sMysql1 = new SMysql(sql1);
    var sMysql2 = new SMysql(sql2);

    function step1() {
        return new Promise(function(resolve, reject) {
            sMysql1
                .exportTable(table)
                .end(function(data){
                    resolve(data[0]);
                });
        });
    }
    function step2(data) {
        return new Promise(function(resolve, reject) {
            sMysql2
                .importTable(table,data)
                .end(function(data){
                    resolve();
                });
        });
    }
    function *steps() {
        var data = yield step1();
        yield step2(data);
    }
    co(steps).then(function(data){
        callback && callback();
    });
}
SMysql.sort = function(order, sortBy) {
  var ordAlpah = (order == 'asc') ? '>' : '<';
  var sortFun = new Function('a', 'b', 'return Number(a.' + sortBy + ')' + ordAlpah + 'Number(b.' + sortBy + ')?1:-1');
  return sortFun;
}
module.exports = SMysql;
