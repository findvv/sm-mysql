'use strict';
let all = require('./all.js');
let mysql   = require('mysql');
let extend = require('extend');
class SMysql {
    constructor(config, db) {
        let obj = db ? extend(config,{'database':db}) : config;
        this.config = config;
        this.result = [];
        this.steps = [];
        this.connection = mysql.createConnection(obj); 
        this.connection.connect();
        for(let key in all) {
            this[key] = all[key];
        }
    }
    end(func) {
        (async ()=>{
            for(let step of this.steps) {
                await new Promise((resolve, reject)=>{
                    step['func'].call(this, step['args'], resolve);
                });
            }
        })().then(()=>{
            func && func(this.result)
            this.connection.end();
        })
    }
    static copyTable(sql1, sql2, sqlName, tableName, callback){
        let sMysql1 = new SMysql(sql1, sqlName),
            sMysql2 = new SMysql(sql2, sqlName);

        function step1() {
            return new Promise((resolve, reject)=>{
                sMysql1
                    .exportTable(tableName)
                    .end((data)=>{
                        resolve(data[0]);
                    });
            });
        }
        function step2(data) {
            return new Promise((resolve, reject)=>{
                sMysql2
                    .importTable(tableName,data)
                    .end(()=>{
                        resolve();
                    });
            });
        }

        (async ()=>{
            let data = await step1();
            await step2(data);
        })().then(()=>{
            callback && callback();
        });
    }
}
module.exports = SMysql;
