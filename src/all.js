'use strict';
var extend = require('extend');
var search = require('./search.js');
var add = require('./add.js');
var del = require('./delete.js');
var update = require('./update.js');
var delTable = require('./deleteTable.js');
var createTable = require('./createTable.js');
module.exports = extend(search,add,del,update,delTable,createTable);