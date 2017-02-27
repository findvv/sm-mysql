'use strict';
/** @examples
1.  sMysql.createSql('test7');
*/
module.exports = {
    createSqlHandler : function(args, resolve){
        var that = this,
            connection = that.connection,
            sql = args[0];

        connection.query(`CREATE DATABASE ${sql}`, function(err, rows, fields) {
            that.startNum += 1;
            err ? that.result.push(err) : that.result.push(rows);
            resolve();
        });
    },
    createSql : function(index, key){     
        this.steps.push({
            name: 'createSqlHandler',
            args: arguments
        });
        return this;
    }
}
