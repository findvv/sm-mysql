'use strict';
/** @examples
1.  sMysql.createSql('test7');
*/
function createSqlHandler(args, resolve){
    let connection = this.connection,
        sql = args[0];

    connection.query(`CREATE DATABASE ${sql}`, (err, rows, fields)=>{
        err ? this.result.push(err) : this.result.push(`创建数据库${sql}成功`);
        resolve();
    });
}
module.exports = {
    createSql(){     
        this.steps.push({
            func: createSqlHandler,
            args: arguments
        });   
        return this;
    }
}
