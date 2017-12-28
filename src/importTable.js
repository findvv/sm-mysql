'use strict';
/** @examples
*/
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
function importTableHandler(args, resolve){
    var connection = this.connection,
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
    
    async function steps() {
        await step(query);
        await step(arrToString(table, data));
    }
    steps().then(()=>{
        this.result.push('导入成功');
        resolve();
    });
}
module.exports = {
    importTable(){     
        this.steps.push({
            func: importTableHandler,
            args: arguments
        });   
        return this;
    }
}
