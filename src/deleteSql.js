'use strict';
/** @examples
删除数据库
1.  sMysql.deleteSql('test8');
*/
function deleteSqlHandler(args, resolve){
    var connection = this.connection,
        sql = args[0];

    connection.query(`DROP DATABASE ${sql}`, (err, rows, fields)=>{
        err ? this.result.push(err.code) : this.result.push(`成功删除数据库：${sql}`);
        resolve();
    });
}
module.exports = {
    deleteSql(){     
        this.steps.push({
            func: deleteSqlHandler,
            args: arguments
        });   
        return this;
    }
}
