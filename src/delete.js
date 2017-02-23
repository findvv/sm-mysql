'use strict';
module.exports = {
    delHandler : function(args, resolve){
        var that = this,
            connection = that.connection,
            obj = args[0],
            table = that.config.table,
            key = "'" + table + "'.'" + Object.keys(obj)[0] + "'",
            value = "'" + obj[Object.keys(obj)[0]] + "'";

        var test = "DELETE FROM `test1` WHERE `test1`.`name` = 'test' AND `test1`.`password` = 'test1'"
        console.log(`delete from ${table} where ${key} = ${value}`);
        connection.query(test, function(){
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
