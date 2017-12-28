'use strict';
/** @examples
1. sMysql.deleteTable(['movie1','movie2','movie3','movie4','movie5']) ==> 删除数据表
2. sMysql.deleteTable('movie1');
*/
function delTableHandler(args, resolve){
    var connection = this.connection,
        table = String(Array.from(args));

    connection.query(`DROP TABLE ${table}`, (err, rows, fields)=>{
        err ? this.result.push(err.code) : this.result.push(`成功删除数据表：${table}`);
        resolve();
    });
}
module.exports = {
    deleteTable(){     
        this.steps.push({
            func: delTableHandler,
            args: arguments
        });   
        return this;
    }
}
