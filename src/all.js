'use strict';
var search = require('./search.js');
var add = require('./add.js');
var del = require('./delete.js');
var update = require('./update.js');
var extend = require('extend');
module.exports = extend(search,add,del,update);