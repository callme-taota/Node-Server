import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
                json = JSON.parse(data);
            }
        })
        json = JSON.parse(json)
        return json.apis;
    }

    static CheckApi(arr){
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

}
