'use strict';
/** @examples
1. sMysql.search('*') ==> 搜索表中所有数据
2. sMysql.search('name') ==> 搜索表中所有key为name的数据
3. sMysql.search(['name','password']) ==> 搜索表中所有key为name和password的数据
4. sMysql.search(['name','password'],{'name':'1'}) ==> 搜索表中所有符合key为name，值为1的，key为name和password的数据
5. sMysql.search(['name','password'],{'name':'1'}) ==> 搜索表中所有符合key为name，值为1的，key为name和password的数据
   sMysql.search({
        query: '*',
        condition: {'name':'1'},
        
   })
*/
var util = require('./util.js');
module.exports = {
    searchHandler : function(args, resolve){
        var that = this,
            connection = that.connection,
            obj = args[0],
            query = String(args[0].query),
            table = that.config.table,
            condition = args[0].condition ? (' WHERE ' + util.and(args[0].condition)) : '';

        connection.query(`SELECT ${query} FROM ${table}${condition}`, function(err, rows, fields) {
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
    search : function(index, key){        
        this.steps.push({
            name: 'searchHandler',
            args: arguments
        });
        return this;
    }
}