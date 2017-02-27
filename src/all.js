'use strict';
var extend = require('extend');
var search = require('./search.js');
var add = require('./add.js');
var del = require('./delete.js');
var update = require('./update.js');
var createTable = require('./createTable.js');
var deleteTable = require('./deleteTable.js');
var createSql = require('./createSql.js');
var deleteSql = require('./deleteSql.js');
module.exports = extend(search,add,del,update,deleteTable,createTable,createSql,deleteSql);