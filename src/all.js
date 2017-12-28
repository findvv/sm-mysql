'use strict';
let extend = require('extend');
let search = require('./search.js');
let insert = require('./insert.js');
let deleteData = require('./deleteData.js');
let update = require('./update.js');
let createTable = require('./createTable.js');
let deleteTable = require('./deleteTable.js');
let createSql = require('./createSql.js');
let deleteSql = require('./deleteSql.js');
let copyTable = require('./copyTable.js');
let exportTable = require('./exportTable.js');
let importTable = require('./importTable.js');

module.exports = extend(search,insert,deleteData,update,deleteTable,createTable,createSql,deleteSql,copyTable,exportTable,importTable);