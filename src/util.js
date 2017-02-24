'use strict';
var obj = {
    and: function(obj){
        var keys = Object.keys(obj),
            str = '';

        for(var i = 0; i < keys.length; i++) {
            var key = keys[i],
                value = obj[keys[i]],
                equl = value.indexOf('%') == -1 ? '=' : ' LIKE ',
                sum = key + equl + '"' + value + '"';

            if (i == 0) {
                str += sum;
            } else {
                str += ' AND ' + sum;
            }
        }
        return str;
    }
}
module.exports = obj;