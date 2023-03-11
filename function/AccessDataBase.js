import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sys } from './Sys_fn.js';
import mysql from 'mysql';

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName);
const dir = path.join(__dirname,'/config.json');


const ReadConfig = () => {
    var json = fs.readFileSync(dir, 'utf8',function(err,data){
        if(err){
            console.error(err);
            return;
        }
        json = JSON.parse(data);
    })
    return json;
}



const SetConfig = async (data) => {
    if(data.Eligibility === false ){
        console.log("初次设置数据库连接");
        let user = await Sys.Input("输入数据库用户名：");
        let password = await Sys.Input("输入数据库密码：");
        let database = await Sys.Input("输入数据库库名：");
        let dataBase = {
            "user" :user,
            "password" :password,
            "database" :database,
            "Eligibility":false
        }
        CheckData(dataBase);
    }else{
        CheckData(data);
    }
}

const CheckData = (data) => {
    if(data.user!=="" && data.password !=="" && data.dataBased !==""){
        var con = mysql.createConnection({
            host: "localhost",
            user: data.user,
            password: data.password,
            database: data.database,
        })
        con.connect((err)=>{
            if(err){
                console.error("数据库信息有误");
                SetConfig(data);
            }else{
                if(data.Eligibility==false){
                    data.Eligibility=true;
                    let rs = JSON.parse(ReadConfig());
                    rs.dataBase = data;
                    let wrs = JSON.stringify(rs);
                    fs.writeFile(dir,wrs,'utf8',(err)=>{});        
                }else{
                    console.log("数据库连接成功")
                }
            }
        })
        con.end(function(err){});
    }
}

export const TryAccess = () => {
    let data = JSON.parse(ReadConfig());
    let config = data.dataBase;
    SetConfig(config);
}

export const Dosql = async (sql) => {
    return new Promise((resolve, reject) => {
        let data = JSON.parse(ReadConfig());
        let config = data.dataBase;
        var con = mysql.createConnection({
            host:"localhost",
            user:config.user,
            password:config.password,
            database:config.database
        });
        con.connect(function(err){})
        con.query(sql, function (err, res) {
            if (!err) {
                resolve(res);
            } else {
                console.log("数据库操作错误");
            }
        })
        con.end(function(err){});
    })
}

// var con =mysql .createConnection({
//     host:"localhost",
//     user:"root",
//     password:"Mysqlroot",
//     database:"mysqlbase"
// })

// con.connect(function(err){
//     if(!err){
//         console.log("连接成功")
//     }else{
//         console.log("连接错误",err)
//     }
// })

// con.query('select * from classes',function (err,result){
//     if(!err){
//         for(let i= 0;i<=result.length;i++){
//             obj.push(result[i])
//         }
//     }else{
//         console.error("数据操作错误")
//     }
// })


// con.end(function(err){
//     if(!err){
//         console.log("断开成功")
//     }
// })