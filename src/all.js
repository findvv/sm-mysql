'use strict';
var extend = require('extend');
var search = require('./search.js');
var add = require('./add.js');
var deleteData = require('./deleteData.js');
var update = require('./update.js');
var createTable = require('./createTable.js');
var deleteTable = require('./deleteTable.js');
var createSql = require('./createSql.js');
var deleteSql = require('./deleteSql.js');
module.exports = extend(search,add,deleteData,update,deleteTable,createTable,createSql,deleteSql);