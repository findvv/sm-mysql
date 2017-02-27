'use strict';
/** @examples
删除数据库
1.  sMysql.deleteSql('test8');
*/
module.exports = {
    deleteSqlHandler : function(args, resolve){
        var that = this,
            connection = that.connection,
            sql = args[0];

        connection.query(`DROP DATABASE ${sql}`, function(err, rows, fields) {
            that.startNum += 1;
            err ? that.result.push(err) : that.result.push(rows);
            resolve();
        });
    },
    deleteSql : function(index, key){     
        this.steps.push({
            name: 'deleteSqlHandler',
            args: arguments
        });
        return this;
    }
}
