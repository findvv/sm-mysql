'use strict';
/** @examples
1. sMysql.createTable('add');
*/
module.exports = {
    createTableHandler : function(args, resolve){
        var that = this,
            connection = that.connection,
            table = args[0];

        connection.query(`CREATE TABLE ${table}( runoob_id INT NOT NULL AUTO_INCREMENT )`, function() {
            that.startNum += 1;
            resolve();
        });
    },
    createTable : function(index, key){        
        this.steps.push({
            name: 'addHandler',
            args: arguments
        });
        return this;
    }
}
