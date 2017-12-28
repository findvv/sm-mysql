'use strict';
/** @examples
1.  sMysql.createTable('test7',{
        'uid' : {
            type: 'INT',
            length: 10,
            isNull: false,
            default: '1'
        },
        'name' : {
            type: 'VARCHAR',
            length: 10,
            isNull: true,
            default: 'zzx'
        }
    });
*/
function createTableHandler(args, resolve){
    var connection = this.connection,
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

    connection.query(`CREATE TABLE ${table} (${str}) CHARSET=utf8`, (err, rows, fields)=>{
        err ? this.result.push(err) : this.result.push(`创建数据表${table}成功`);
        resolve();
    });
}
module.exports = {
    createTable(){     
        this.steps.push({
            func: createTableHandler,
            args: arguments
        });   
        return this;
    }
}
