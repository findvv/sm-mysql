'use strict';
var db = require('./src/config.js');
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
SMysql.prototype.searchHandler = function(args, resolve){
    var that = this,
        connection = that.connection,
        key = args[0];

    if (!key) {
        key = '*';
    } else if(key.length > 0) {
        key = String(key);
    }
    connection.query((`select ${key} from ${that.config.table}`), function(err, rows, fields) {
        that.startNum += 1;
        var index = args[1] || that.startNum;
        if (err) {
            that.result.push(err);
            resolve();
        } else {
            that.result.push(rows);
            resolve();
        }
    });
}
SMysql.prototype.search = function(index, key){        
    this.steps.push({
        name: 'searchHandler',
        args: arguments
    });
    return this;
}
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

var sMysql = new SMysql(db);

sMysql.search(['name'])
      .search()
      .search(['password'])
      .search(['name','password'])
      .end(function(data){
        console.log(data[2]);
      });
