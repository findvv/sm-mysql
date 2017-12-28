'use strict';
/** @examples
*/
function exportTableHandler(args, resolve){
        var connection = this.connection,
            table = args[0],
            result = {};

        function step1() {
            return new Promise(function(resolve, reject) {
                connection.query(`SHOW CREATE TABLE ${table}`, function(err, rows, fields){
                    resolve(rows[0]['Create Table']);
                });
            });
        }
        function step2() {
            return new Promise(function(resolve, reject) {
                connection.query(`SELECT * FROM ${table}`, function(err, rows, fields){
                    resolve(rows);
                });
            });
        }
        async function steps() {
            let case1 = await step1();
            let case2 = await step2();
            result['query'] = case1;
            result['data'] = case2;
        }
        steps().then(()=>{
            this.result.push(result);
            resolve();
        });
    }
module.exports = {
    exportTable(){     
        this.steps.push({
            func: exportTableHandler,
            args: arguments
        });   
        return this;
    }
}
