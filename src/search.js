'use strict';
/** @examples
1. sMysql.search('*') ==> 搜索表中所有数据
2. sMysql.search('name') ==> 搜索表中所有key为name的数据
3. sMysql.search({
        query: '*',                     // 搜索关键词
        condition: {'name':'1'},        // 搜索条件
        orderBy:['name','password'],    // 排序条件
        sort: 'ASC'                     // ASC升序或DESC降序
   })
*/
var util = require('./util.js');
function isObject(obj) {
    return Object.prototype.toString.call(obj) == '[object Object]';
}
function isStringOrArray(obj) {
    return typeof obj == 'string' || Object.prototype.toString.call(obj) == '[object Array]';
}

module.exports = {
    searchHandler : function(args, resolve){
        var that = this,
            connection = that.connection,
            obj = args[0],
            table = that.config.table,
            query = '*', condition = '',orderBy = '',sort = '';

        if (isStringOrArray(obj)) {
            query = String(obj);
        } else if (isObject(obj)) {
            if (isStringOrArray(obj.query)) {
                query = String(obj.query);
            }
            if (isStringOrArray(obj.condition)) {
                condition = ` WHERE ${util.and(obj.condition)}`;
            }
            if (isStringOrArray(obj.orderBy)) {
                sort = (obj.sort == 'ASC' || obj.sort == 'DESC') ? obj.sort : 'ASC';
                orderBy = ` ORDER BY ${String(obj.orderBy)} ${sort}`;
            }
        }
        connection.query(`SELECT ${query} FROM ${table}${condition}${orderBy}`, function(err, rows, fields) {
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