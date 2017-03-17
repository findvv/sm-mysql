'use strict';
/** @examples
*/
var co = require('co');
function arrToString(table, arr) {
    var arr1 = [], arr2 = [],arr3 = [], str1, str2;
    for(var k in arr[0]) {
        arr1.push(k);
    }
    str1 = '(' + String(arr1) + ')';
    for(var v of arr) {
        arr3 = [];
        for(var i in v) {
            arr3.push('"' + v[i] + '"');
        }
        arr2.push('(' + String(arr3) + ')');
    }
    str2 = String(arr2);
    return `INSERT INTO ${table} ${str1} VALUES ${str2}`
}
module.exports = {
    importTableHandler : function(args, resolve){
        var that = this,
            connection = that.connection,
            table = args[0],
            query = args[1]['query'],
            data = args[1]['data'],
            result = {};

        function step(query) {
            return new Promise(function(resolve, reject) {
                connection.query(query, function(err, rows, fields){
                    if (err) {
                        console.log(err);
                    }
                    resolve();
                });
            });
        }
        
        function *steps() {
            yield step(query);
            yield step(arrToString(table, data));
        }
        co(steps).then(function(){
            that.startNum += 1;
            that.result.push('导入成功');
            resolve();
        });
    },
    importTable : function(index, key){        
        this.steps.push({
            name: 'importTableHandler',
            args: arguments
        });
        return this;
    }
}
