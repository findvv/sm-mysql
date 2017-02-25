'use strict';
/** @examples
1. sMysql.delTable('') ==> 删除数据表
*/
module.exports = {
    delTableHandler : function(args, resolve){
        var that = this,
            connection = that.connection,
            table = args[0] || that.config.table;

        connection.query(`DROP TABLE ${table}`, function(){
            that.startNum += 1;
            resolve();
        });
    },
    delTable : function(index, key){        
        this.steps.push({
            name: 'delTableHandler',
            args: arguments
        });
        return this;
    }
}
