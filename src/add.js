'use strict';
/** @examples
1. sMysql.add({'name': 'test','password': '123456'}) ==> 向表中增加key->name/value->test，key->password/value->123456的数据
*/
module.exports = {
    addHandler : function(args, resolve){
        var that = this,
            connection = that.connection,
            obj = args[0],
            table = that.config.table,
            arr1 = [],
            arr2 = [],
            str1 = '',
            str2 = '';

        for(var k in obj) {
            arr1.push(k);
            arr2.push('"' + obj[k] + '"');
        }
        str1 = '(' + String(arr1) + ')';
        str2 = '(' + String(arr2) + ')';
        connection.query(`INSERT INTO ${table} ${str1} VALUES ${str2}`, function(err, rows, fields) {
            that.startNum += 1;
            err ? that.result.push(err) : that.result.push(rows);
            resolve();
        });
    },
    add : function(index, key){        
        this.steps.push({
            name: 'addHandler',
            args: arguments
        });
        return this;
    }
}
