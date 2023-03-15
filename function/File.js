import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)
const jsonfile = path.join(__dirname,'../config.json')


export class File{
    static _readFile(){
        var json = fs.readFileSync(jsonfile,'utf8',function(err,data){
            if(err){
                console.error("err",err);
                return;
            }else{
                json = JSON.parse(data)
            }
        })
        json = JSON.parse(json);
        return json;
    }

    static _setFile(rs){
        let wrs = JSON.stringify(rs,"","\t");
        fs.writeFile(jsonfile,wrs,"utf8",err=>{})
    }

    static getPort(){
        let json = this._readFile();
        return json.port;
    }

    static getAPIconfig(){
        let json = this._readFile();
        return json.apis;
    }

    static getDBConfig(){
        let json = this._readFile();
        return json.dataBase;
    }

    static getTime(){
        let json = this._readFile();
        let stime = json.starttime;
        let utime = json.updatetime;
        return stime,utime;
    }

    static CheckAPI(){
        let json = this._readFile();
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

    static CheckTime(){
        let stime,utime = this.getTime();
        if(stime===utime){
            return true;
        }else{
            return false;
        }
    }
    
    static SetTime(){
        let time = Date.now();
        let json = this._readFile();
        json.starttime = time;
        json.updatetime= time;
        this._setFile(json);
    }
    
    static UpdateTime(){
        let time = Date.now();
        let json = this._readFile();
        json.updatetime = time;
        this._setFile(json);
    }

    static SetAPIconfig(s){
        let json = this._readFile();
        let oldapi = json.apis;
        let ol = oldapi.length;
        let nl = s.length;
        let state = "";
        if(ol>nl){
            state="delect";
        }else if(ol==nl){
            state="update";
        }else{
            state="add";
        }
        let obj={oldapi,state};
        json.apis = s;
        this._setFile(json);
        return obj;
    }


}