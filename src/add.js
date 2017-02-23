'use strict';
module.exports = {
    addHandler : function(args, resolve){
        var that = this,
            connection = that.connection,
            key = args[0];

        if (!key) {
            key = '*';
        } else if(key.length > 0) {
            key = String(key);
        }
        connection.query((`select ${key} from ${that.config.table}`), function(err, rows, fields) {
            that.startNum += 1;
            var index = args[1] || that.startNum;
            if (err) {
                that.result.push(err);
                resolve();
            } else {
                that.result.push(rows);
                resolve();
            }
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
