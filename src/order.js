'use strict';
/** @examples
1. sMysql.search('*') ==> 搜索表中所有数据
2. sMysql.search('name') ==> 搜索表中所有key为name的数据
3. sMysql.search(['name','password']) ==> 搜索表中所有key为name和password的数据
4. sMysql.search(['name','password'],{'name':'1'}) ==> 搜索表中所有符合key为name，值为1的，key为name和password的数据
*/
var util = require('./util.js');
module.exports = {
    orderHandler : function(args, resolve){
        var that = this,
            connection = that.connection,
            table = args[0],
            content = args[1]
            key = args[2],
            type = args[3];

        connection.query(`SELECT ${content} FROM ${table} ORDER BY ${key} ${type}`, function(err, rows, fields) {
            that.startNum += 1;
            if (err) {
                that.result.push(err);
                resolve();
            } else {
                that.result.push(rows);
                resolve();
            }
        });
    },
    order : function(index, key){        
        this.steps.push({
            name: 'orderHandler',
            args: arguments
        });
        return this;
    }
}