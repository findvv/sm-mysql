'use strict';
var obj = {
    and: function(obj,type){
        var keys = Object.keys(obj),
            str = '';

        for(var i = 0; i < keys.length; i++) {
            var key = keys[i],
                value = obj[keys[i]],
                equl = '=';
                sum = key + equl + '"' + value + '"';

            if (i == 0) {
                str += sum;
            } else {
                str += ' AND ' + sum;
            }
        }
        return str;
    },
    where: function(obj,type){
        var keys = Object.keys(obj),
            str = '';

        for(var i = 0; i < keys.length; i++) {
            var key = keys[i],
                value = obj[keys[i]],
                equl = (value.indexOf('%') != -1 || type == 'LIKE') ? ' LIKE ' : (type == 'REGEXP' ? ' REGEXP ' : '=');
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