'use strict';
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
        connection.query(`insert into ${table} ${str1} values ${str2}`, function() {
            that.startNum += 1;
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
