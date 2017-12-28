'use strict';
/** @examples
1. sMysql.search('table','*') ==> 搜索table表中所有数据
2. sMysql.search('table','name') ==> 搜索table表中所有key为name的数据
3. sMysql.search('table',{
        query: '*',                     // 搜索关键词
        condition: {'name':'1'},        // 搜索条件
        orderBy:['name','password'],    // 排序条件
        sort: 'ASC',                     // ASC升序或DESC降序
        limit: '0,100'
   })
*/
var util = require('./util.js');
function isObject(obj) {
    return Object.prototype.toString.call(obj) == '[object Object]';
}
function isStringOrArray(obj) {
    return obj && (typeof obj == 'string' || Object.prototype.toString.call(obj) == '[object Array]');
}
function searchHandler(args, resolve) {
    var connection = this.connection,
        table = args[0],
        obj = args[1],
        query = '*', condition = '',orderBy = '',sort = '',str = '',limit = '';

    if (isStringOrArray(obj)) {
        query = String(obj);
    } else if (isObject(obj)) {
        if (isStringOrArray(obj.query)) {
            query = String(obj.query);
        }
        if (isObject(obj.condition)) {
            condition = ` WHERE ${util.where(obj.condition)}`;
        }
        if (isStringOrArray(obj.orderBy)) {
            sort = (obj.sort == 'ASC' || obj.sort == 'DESC') ? obj.sort : 'ASC';
            orderBy = ` ORDER BY ${String(obj.orderBy)} ${sort}`;
        }
        if (isStringOrArray(obj.limit)) {
            limit = ` LIMIT ${obj.limit}`;
        }
    }
    str = `SELECT ${query} FROM ${table}${condition}${orderBy}${limit}`;
    connection.query(str, (err, rows, fields)=>{
        err ? this.result.push(err) : this.result.push(rows);
        resolve();
    });
}
module.exports = {
    search(){     
        this.steps.push({
            func: searchHandler,
            args: arguments
        });   
        return this;
    }
}