'use strict';
/** @examples
1. sMysql.del() ==> 删除表中所有数据
2. sMysql.del({ ==> 删除表中name值为test，password值为123的数据
    'name': 'test',
    'password': '123'
})
*/
module.exports = {
    delHandler : function(args, resolve){
        var that = this,
            connection = that.connection,
            obj = args[0] || {}, 
            table = that.config.table,
            keys = Object.keys(obj),
            str = '',
            newStr = '';

        if (keys.length == 0) {
            newStr = `DELETE FROM ${table}`;
        } else {
            for(var i = 0; i < keys.length; i++) {
                if (i == 0) {
                    str += keys[i] + '=' + obj[keys[i]];
                } else {
                    str += ' AND ' + keys[i] + '=' + obj[keys[i]];
                }
            }
            newStr = `DELETE FROM ${table} WHERE ${str}`;
        }        
        connection.query(newStr, function(){
            that.startNum += 1;
            resolve();
        });
    },
    del : function(index, key){        
        this.steps.push({
            name: 'delHandler',
            args: arguments
        });
        return this;
    }
}
