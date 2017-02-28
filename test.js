var SMysql = require('./index.js')
var db = require('./src/config.js');
var fs = require('fs');
var sMysql = new SMysql(db);
sMysql
    .search({
        query: '*',                     // 搜索关键词
        condition: '',        // 搜索条件
        orderBy:'rate',    // 排序条件
        sort: 'ASC'                     // ASC升序或DESC降序
    })
    .end(function(data){
        fs.writeFile('result.md', JSON.stringify(data[0]), 'utf-8');
    });