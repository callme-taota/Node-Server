import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ReadConfig } from './AccessDataBase.js'; 

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName);
const dir = path.join(__dirname,'/config.json');

export class Sys{
    static _readlineSync() {
        return new Promise((resolve, reject) => {
            process.stdin.resume();
            process.stdin.on('data', function (data) {
                process.stdin.pause();
                resolve(data);
            });
        });
    }
    
    static Input = async (info) => {
        console.log(info);
        let data = await this._readlineSync();
        data = data.toString().slice(0,-1);
        return data;
    }

    static getPort(){
        var json = fs.readFileSync(dir, 'utf8',function(err,data){
            if(err){
                console.error(err);
                return;
            }
            json = JSON.parse(data);
        })
        json = JSON.parse(json)
        return json.port;
    }

    static getAPIconfig(){
        var json = fs.readFileSync(dir,'utf8',function(err,data){
            if(err){
                console.error(err);
                return;
            }else{
                json = JSON.parse(decodeURIComponent(data));
            }
        })
        json = JSON.parse(decodeURIComponent(json))
        return json.apis;
    }

    static async getAPIconfigSync(){
        return new Promise(function(resolve, reject){
            setTimeout(() => {
                let api = this.getAPIconfig();
                resolve(api);  
            }, 100);
            
        });
    }

    static CheckApi(){
        var json = fs.readFileSync(dir,'utf8',function(err,data){
            if(err){
                console.error(err);
                return;
            }else{
                json = JSON.parse(data);
            }
        })
        json = JSON.parse(json);
        let arr = json.apis;
        let id_arr =  [];
        let port_arr = [];
        for(let i = 0; i < arr.length; i++){
            id_arr.push(arr[i].id);
            port_arr.push(arr[i].port);
        }
        let id_arr_dew = [...new Set(id_arr)];
        let port_arr_dew = [...new Set(port_arr)];
        if(id_arr_dew.length < id_arr.length || port_arr_dew.length < port_arr.length){
            return false;
        }else{
            return true;
        }
    }

    static SetAPISettings(s){
        let rs = JSON.parse(ReadConfig());
        rs.apis = s;
        let wrs = JSON.stringify(rs,"","\t");
        fs.writeFile(dir,wrs,'utf8',err=>{});
    }

    static getDBConfig(){
        var json = fs.readFileSync(dir, 'utf8',function(err,data){
            if(err){
                console.error(err);
                return;
            }
            json = JSON.parse(data);
        })
        json = JSON.parse(json)
        json= json.dataBase;
        return json;
    }

    static SetStartTime(){
        let time = Date.now();
        let rs = JSON.parse(ReadConfig())
        rs.statrtime = time ;
        rs.updatetime = time ; 
        let wrs = JSON.stringify(rs,"","\t");
        fs.writeFile(dir,wrs,"utf8",err=>{})
    }

    static UpdateTime(){
        let time = Date.now() ;
        let rs = JSON.parse(ReadConfig());
        rs.updatetime = time ;
        let wrs = JSON.stringify(rs,"","\t");
        fs.writeFile(dir,wrs,"utf8",err=>{})
    }

    static CheckUpdate(){
        let rs = JSON.parse(ReadConfig())
        let stime = rs.statrtime;
        let utime = rs.updatetime;
        if(stime!==utime){
            return false;
        }else{
            return true;
        }
    }

}
