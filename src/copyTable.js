'use strict';
/** 
复制表
@examples
1.  sMysql.copyTable('xiangmu','xiangmu3','xiangmu4','xiangmu5');
    将xiangmu拷贝一份为xiangmu3，xiangmu4，xiangmu5，两个表在同一个数据库中
*/
function copyTableHandler(args, resolve){
    var connection = this.connection,
        table1 = args[0],
        result = [],
        table2 = Array.from(args);

    table2 = table2.slice(1,table2.length);
    function everyQuery(query) {
        return new Promise(function(resolve, reject) {
            connection.query(query, function(err, rows, fields) {
                resolve(rows);
            });
        })
    }

    function takeEveryQuery(table) {
        return new Promise(function(resolve, reject) {
            takeQuery(table).then(function(){
                resolve();
            });
        })
    }
    async function goQuery() {
        for(var table of table2) {
            await takeEveryQuery(table);
        }
    }

    async function takeQuery(table) {
        let step1 = await everyQuery(`SHOW CREATE TABLE ${table1}`);
        await everyQuery(step1[0]['Create Table'].replace(table1,table));
        let step2 = await everyQuery(`SELECT * FROM ${table1}`);
        await everyQuery(`INSERT INTO ${table} (${String(Object.keys(step2[1]))}) SELECT * FROM ${table1}`);
        result.push(`成功复制${table1}到${table}`);
    }
    goQuery().then(()=>{
        this.result.push(result.join(';'));
        resolve();
    });
}
module.exports = {
    copyTable(){     
        this.steps.push({
            func: copyTableHandler,
            args: arguments
        });   
        return this;
    }
}
