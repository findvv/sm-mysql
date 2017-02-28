'use strict';
/** 
复制表
@examples
1.  sMysql.copyTable('movie','movie2');
将movie拷贝一份为movie2，两个表在同一个数据库中
*/
var co = require('co');
module.exports = {
    copyTableHandler : function(args, resolve){
        var that = this,
            connection = that.connection,
            table1 = args[0],
            table2 = Array.from(args),
            step1,step2,step3,step4;

        table2 = table2.slice(1,table2.length);
        function everyQuery(query) {
            return new Promise(function(resolve, reject) {
                connection.query(query, function(err, rows, fields) {
                    if (err) {
                        that.result.push(err);
                        resolve();
                    } else {
                        resolve(rows);
                    }
                });
            })
        }

        function takeEveryQuery(table) {
            return new Promise(function(resolve, reject) {
                co(takeQuery.bind(null, table)).then(function(){
                    resolve();
                });
            })
        }
        function *goQuery() {
            for(var table of table2) {
                yield takeQuery(table);
            }
        }

        function *takeQuery(table) {
            step1 = yield everyQuery(`SHOW CREATE TABLE ${table1}`);
            step1 && (step2 = yield everyQuery(step1[0]['Create Table'].replace(table1,table)));
            step2 && (step3 = yield everyQuery(`SELECT * FROM ${table1}`));
            step3 && (step4 = yield everyQuery(`INSERT INTO ${table} (${String(Object.keys(step3[1]))}) SELECT * FROM ${table1}`))
            step4 && that.result.push(step4);
        }
        co(goQuery).then(function(){
            resolve();
        });
    },
    copyTable : function(index, key){     
        this.steps.push({
            name: 'copyTableHandler',
            args: arguments
        });
        return this;
    }
}
