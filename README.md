sm-mysql
==============

[sm-mysql](https://github.com/findvv/sm-mysql).

操作数据库的简单接口，支持链式操作，返回结果列表

## Installation

```
npm install sm-mysql --save
```

## 支持列表

以下操作已经支持:

* 新增数据库
* 删除数据库
* 新增数据表
* 删除数据表
* 插入新数据
* 更新数据
* 删除数据
* 查询数据

### Example

```
var SMysql = require('sm-mysql')
var db = {  
  host     : 'localhost',  
  user     : 'root',  
  password : 'password',  
  database : 'test',
  port     : '3724',
  table    : 'test'
};
var sMysql = new SMysql(db);
sMysql
    .createSql('test8')
    .end(function(data){
        console.log(data[0]);
    });

```
# License

MIT Licensed. Copyright (c) Zhaoxiang Zhang 2017.
