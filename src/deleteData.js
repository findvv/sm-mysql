'use strict';
/** @examples
1. sMysql.deleteData('table') ==> 删除table表中所有数据
2. sMysql.deleteData('table', { ==> 删除表中name值为test，password值为123的数据
    'name': 'test',
    'password': '123'
})
*/
var util = require('./util.js');
function deleteDataHandler(args, resolve) {
        var connection = this.connection,
            obj = args[1], 
            table = args[0],
            str = '',
            newStr = '';

        if (!obj) {
            newStr = `DELETE FROM ${table}`;
        } else {
            str = util.where(obj);
            newStr = `DELETE FROM ${table} WHERE ${str}`;
        }        
        connection.query(newStr, (err, rows, fields)=>{
            err ? this.result.push(err.code) : this.result.push(`成功删除${table}数据`);
            resolve();
        });
    }
module.exports = {
    deleteData(){     
        this.steps.push({
            func: deleteDataHandler,
            args: arguments
        });   
        return this;
    }
}
