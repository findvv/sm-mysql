'use strict';
/** @examples
1. sMysql.createTable('add');
*/
module.exports = {
    createTableHandler : function(args, resolve){
        var that = this,
            connection = that.connection,
            table = args[0],
            data = args[1],
            str = (function(){
                var arr = [];

                for(var key in data) {
                    var isNull = data[key].isNull ? 'NULL' : 'NOT NULL',
                        defaultStr = data[key].default ? `DEFAULT '${data[key].default}'` : '';

                    arr.push(`${key} ${data[key].type}(${data[key].length}) ${isNull} ${defaultStr}`);
                }
                return String(arr);
            })();

        // CREATE TABLE `test`.`something` ( `uid` INT(10) NOT NULL ) ENGINE = InnoDB
        connection.query(`CREATE TABLE test.${table} (${str})`, function(err, rows, fields) {
            that.startNum += 1;
            err ? that.result.push(err) : that.result.push(rows);
            resolve();
        });
    },
    createTable : function(index, key){     
        this.steps.push({
            name: 'createTableHandler',
            args: arguments
        });
        return this;
    }
}
