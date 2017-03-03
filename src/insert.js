'use strict';
/** @examples
1. sMysql.insert('table',{'name': 'test','password': '123456'}) ==> 向table表中增加key->name/value->test，key->password/value->123456的数据
2. sMysql.insert('table',[{'name': 'test1','password': '12'},{'name': 'test2','password': '123'}])
*/
module.exports = {
    insertHandler : function(args, resolve){
        var that = this,
            connection = that.connection,
            obj = args[1],
            table = args[0],
            arr1 = [],
            arr2 = [],
            arr3 = [],
            str1 = '',
            str2 = '',
            str3 = '';

        if (!obj.length) {
            for(var k in obj) {
                arr1.push(k);
                arr2.push(obj[k]);
            }
            str1 = '(' + String(arr1) + ')';
            str2 = '(' + String(arr2) + ')';
        } else {
            for(var k in obj[0]) {
                arr1.push(k);
            }
            str1 = '(' + String(arr1) + ')';
            for(var v of obj) {
                arr3 = [];
                for(var i in v) {
                    arr3.push('"' + v[i] + '"');
                }
                arr2.push('(' + String(arr3) + ')');
            }
            str2 = String(arr2);
        }
        connection.query(`INSERT INTO ${table} ${str1} VALUES ${str2}`, function(err, rows, fields) {
            that.startNum += 1;
            err ? that.result.push(err) : that.result.push(rows);
            resolve();
        });
    },
    insert : function(index, key){        
        this.steps.push({
            name: 'insertHandler',
            args: arguments
        });
        return this;
    }
}
