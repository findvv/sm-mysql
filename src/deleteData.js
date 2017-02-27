'use strict';
/** @examples
1. sMysql.deleteData() ==> 删除表中所有数据
2. sMysql.deleteData({ ==> 删除表中name值为test，password值为123的数据
    'name': 'test',
    'password': '123'
})
*/
var util = require('./util.js');
module.exports = {
    deleteDataHandler : function(args, resolve){
        var that = this,
            connection = that.connection,
            obj = args[0], 
            table = that.config.table,
            str = '',
            newStr = '';

        if (!obj) {
            newStr = `DELETE FROM ${table}`;
        } else {
            str = util.where(obj);
            newStr = `DELETE FROM ${table} WHERE ${str}`;
        }        
        connection.query(newStr, function(){
            that.startNum += 1;
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
