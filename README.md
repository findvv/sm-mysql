操作数据库的简单接口

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
* 复制数据表
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
    .createSql('db')
    .createTable('table')
    .insert('table',[{'name': 'test1','password': '12'},{'name': 'test2','password': '123'}])
    .search()
    .end(function(data){  // data为各个步骤的返回结果
        console.log(data);
    });

```
# License

MIT Licensed. Copyright (c) Zhaoxiang Zhang 2017.
