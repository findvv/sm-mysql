var SMysql = require('../index.js')
var db = {  
  "host"     : "121.42.166.253",  
  "user"     : "root",  
  "password" : "ZZX$137623",  
  "port"     : "3306"
}
var sMysql = new SMysql(db,'blog');
sMysql
    .search('xiangmu')
    .search('article')
    .end((data)=>{
        console.log(data[1]);
    });


