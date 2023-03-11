import mysql from 'mysql';
import { Sys } from '../Sys_fn.js';
import { Dosql } from '../AccessDataBase.js';

export async function getTable(tablename){
    let obj = {
        result:null,
        code : 200,
        length: 0,
    }
    let sql = "select * from " + tablename
    let res = await Dosql(sql)
    obj.result = res
    obj.length = res.length
    return obj
}

// export function getTable(){
//     return new Promise(function(resolve, reject){
//         let config = Sys.getDBConfig();
//         const con = mysql.createConnection({
//             host:"localhost",
//             user:config.user,
//             password:config.password,
//             database:config.database
//         });
        
//         con.connect(function(err){})
        
//         const sql = "select * from classes"
        
//         con.query(sql, function (err, res) {
//             if (!err) {
//                 resolve(res);
//             } else {
//                 console.log("数据库操作错误");
//             }
//         })    
//         con.end(function(err){});
//     })

// }

