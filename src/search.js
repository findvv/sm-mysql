'use strict';
/** @examples
1. sMysql.search() ==> 搜索表中所有数据
2. sMysql.search('name') ==> 搜索表中所有key为name的数据
3. sMysql.search(['name','password']) ==> 搜索表中所有key为name和password的数据
*/
module.exports = {
    searchHandler : function(args, resolve){
        var that = this,
            connection = that.connection,
            key = args[0],
            table = that.config.table;

        if (!key) {
            key = '*';
        } else if(key.length > 0) {
            key = String(key);
        }
        connection.query(`SELECT ${key} FROM ${table}`, function(err, rows, fields) {
            that.startNum += 1;
            if (err) {
                that.result.push(err);
                resolve();
            } else {
                that.result.push(rows);
                resolve();
            }
        });
    },
    search : function(index, key){        
        this.steps.push({
            name: 'searchHandler',
            args: arguments
        });
        return this;
    }
}