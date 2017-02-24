'use strict';
/** @examples
1. sMysql.update({'password':'121'},{'name':'1234','num':'111'})
 ==> 更新表中满足name为1234，num为111的数据，将key为password的值设定成121
*/
var util = require('./util.js');
module.exports = {
    updateHandler : function(args, resolve){
        var that = this,
            connection = that.connection,
            changeData = args[0],
            queryData = args[1],
            table = that.config.table,
            str1 = util.and(changeData),
            str2 = util.and(queryData);

        connection.query(`UPDATE ${table} SET ${str1} WHERE ${str2}`, function(err, rows, fields) {
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
    update : function(index, key){        
        this.steps.push({
            name: 'updateHandler',
            args: arguments
        });
        return this;
    }
}