'use strict';
/** @examples
1. sMysql.update('table',{'password':'121'},{'name':'1234','num':'111'})
 ==> 更新table表中满足name为1234，num为111的数据，将key为password的值设定成121
*/
var util = require('./util.js');
function updateHandler(args, resolve){
    var connection = this.connection,
        table = args[0],
        changeData = args[1],
        queryData = args[2],
        str1 = util.and(changeData),
        str2 = util.where(queryData);

    connection.query(`UPDATE ${table} SET ${str1} WHERE ${str2}`, (err, rows, fields)=>{
        if (err) {
            this.result.push(err);
            resolve();
        } else {
            this.result.push(`更新${table}数据成功`);
            resolve();
        }
    });
}
module.exports = {
    update(){     
        this.steps.push({
            func: updateHandler,
            args: arguments
        });   
        return this;
    }
}