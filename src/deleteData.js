'use strict';
/** @examples
1. sMysql.deleteData('table') ==> 删除table表中所有数据
2. sMysql.deleteData('table', { ==> 删除表中name值为test，password值为123的数据
    'name': 'test',
    'password': '123'
})
*/
var util = require('./util.js');
module.exports = {
    deleteDataHandler : function(args, resolve){
        var that = this,
            connection = that.connection,
            obj = args[1], 
            table = args[0],
            str = '',
            newStr = '';

        if (!obj) {
            newStr = `DELETE FROM ${table}`;
        } else {
            str = util.where(obj);
            newStr = `DELETE FROM ${table} WHERE ${str}`;
        }        
        connection.query(newStr, function(err, rows, fields){
            that.startNum += 1;
            err ? that.result.push(err.code) : that.result.push(rows);
            resolve();
        });
    },
    deleteData : function(index, key){        
        this.steps.push({
            name: 'deleteDataHandler',
            args: arguments
        });
        return this;
    }
}
