import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sys } from './Sys_fn.js';
import { File } from './File.js';
import mysql from 'mysql';

// const __fileName = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__fileName);
// const dir = path.join(__dirname,'/config.json');
var flag = -1;

export const ReadConfig = () => {
    let json = File._readFile();
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
        await CheckData(dataBase);
    }else{
        await CheckData(data);
    }
}

const CheckData = async (data) => {
    if(data.user!=="" && data.password !=="" && data.dataBased !==""){
        var con = mysql.createConnection({
            host: "127.0.0.1",
            user: data.user,
            password: data.password,
            database: data.database,
        })
        con.connect((err)=>{
            if(err){
                console.error("数据库信息有误",err);
                flag ++;
                console.log(flag)
                if(flag<2){
                    SetConfig(data);
                }else{
                    return false;
                }
            }else{
                if(data.Eligibility==false){
                    data.Eligibility=true;
                    let rs = ReadConfig();
                    rs.dataBase = data;
                    File._setFile(rs);
                    return true;
                }else{
                    console.log("数据库连接成功");
                    return true;
                }
            }
        })
        con.end(function(err){});
    }
}

export const TryAccess = async () => {
    let data = ReadConfig();
    let config = data.dataBase;
    await SetConfig(config);
}

export const Dosql = async (sql) => {
    return new Promise((resolve, reject) => {
        let data = ReadConfig();
        let config = data.dataBase;
        var con = mysql.createConnection({
            host:"127.0.0.1",
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