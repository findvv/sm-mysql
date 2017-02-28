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
            table2 = args[1],
            step1,step2,step3,step4;

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

        function *goQuery() {
            step1 = yield everyQuery(`SHOW CREATE TABLE ${table1}`);
            step1 && (step2 = yield everyQuery(step1[0]['Create Table'].replace(table1,table2)));
            step2 && (step3 = yield everyQuery(`SELECT * FROM ${table1}`));
            step3 && (step4 = yield everyQuery(`INSERT INTO ${table2} (${String(Object.keys(step3[1]))}) SELECT * FROM ${table1}`))
            step4 && that.result.push(step4);
        }

        co(goQuery).then(function(){
            resolve();
        })
    },
    copyTable : function(index, key){     
        this.steps.push({
            name: 'copyTableHandler',
            args: arguments
        });
        return this;
    }
}
