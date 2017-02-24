'use strict';
var obj = {
    and: function(obj){
        var keys = Object.keys(obj),
            str = '';

        for(var i = 0; i < keys.length; i++) {
            if (i == 0) {
                str += keys[i] + '=' + obj[keys[i]];
            } else {
                str += ' AND ' + keys[i] + '=' + obj[keys[i]];
            }
        }
        return str;
    }
}
module.exports = obj;