'use strict';
/** @examples
1. sMysql.deleteTable(['movie1','movie2','movie3','movie4','movie5']) ==> 删除数据表
2. sMysql.deleteTable('movie1');
*/
var co = require('co');
module.exports = {
    exportTableHandler : function(args, resolve){
        var that = this,
            connection = that.connection,
            table = args[0],
            result = {};

        function step1() {
            return new Promise(function(resolve, reject) {
                connection.query(`SHOW CREATE TABLE ${table}`, function(err, rows, fields){
                    resolve(rows[0]['Create Table']);
                });
            });
        }
        function step2() {
            return new Promise(function(resolve, reject) {
                connection.query(`SELECT * FROM ${table}`, function(err, rows, fields){
                    resolve(JSON.stringify(rows));
                });
            })
        }
        function *steps() {
            var case1 = yield step1();
            var case2 = yield step2();
            result['query'] = case1;
            result['data'] = case2;
        }
        co(steps).then(function(){
            that.startNum += 1;
            that.result.push(result);
            resolve();
        });
    },
    exportTable : function(index, key){        
        this.steps.push({
            name: 'exportTableHandler',
            args: arguments
        });
        return this;
    }
}
