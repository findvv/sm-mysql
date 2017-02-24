'use strict';
var search = require('./src/search.js');
var add = require('./src/add.js');
var del = require('./src/delete.js');
var extend = require('extend');
module.exports = extend(search,add,del);