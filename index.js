'use strict';
var db = require('./src/config.js');
var search = require('./src/search.js');
var mysql   = require('mysql');
var co = require('co');
function SMysql(config) {
    this.config = config;
    this.result = [];
    this.steps = [];
    this.startNum = 0;
    this.connection = mysql.createConnection(db); 
    this.connection.connect();
}
SMysql.prototype = search;
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
        func(that.result)
        that.connection.end();
    })
}
module.exports = SMysql;
