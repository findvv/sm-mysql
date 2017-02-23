'use strict';
function Search() {}
Search.prototype.searchHandler = function(args, resolve){
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
}
Search.prototype.search = function(index, key){        
    this.steps.push({
        name: 'searchHandler',
        args: arguments
    });
    return this;
}
module.exports = new Search();