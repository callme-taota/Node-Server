import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import { TryAccess , Dosql } from './AccessDataBase.js';
import { Sys } from './Sys_fn.js';

export function Server(){
    //getHTML path
    const __pathName = fileURLToPath(import.meta.url)
    const __dir2name = path.dirname(__pathName);
    const rp = path.join(__dir2name,'./src');

    //get Server port
    const port = Sys.getPort();

    const app = express();
    app.use(cors());
    TryAccess();
    let API = Sys.getAPIconfig();
    let flag = Sys.CheckApi(API);
    if(flag){
        app.get('/getapilist',(req,res) => {
            res.send(API)
        })
        app.use(express.static(rp))
        

        for(let i = 0; i <API.length; i++) {
            let port = API[i].port;
            app.get(port, async (req, res) => {
                let sql = API[i].sql;
                let limit_flag = API[i].limit_flag;

                let query = [];
                if(API[i].keyValue!=="" || API[i].keyValue!==null) {
                    query = API[i].keyValue.split(";")
                }
                let str =""
                let limit = ""
                if(query.length > 1 || JSON.stringify(req.query)!=="{}"){
                    str = " where "
                    for(let j=0; j<query.length; j++) {
                        if(req.query[query[j]]){
                            str += query[j]+ "="+ req.query[query[j]] + ' ';
                        }
                    }
                    if(req.query.limit && !req.query.offset){
                        limit += ' limit '
                        limit += req.query.limit;
                    }
                    if(req.query.limit && req.query.offset){
                        limit += ' limit '
                        limit += (parseInt(req.query.offset)+1) + " , " + (parseInt(req.query.limit)+parseInt(req.query.offset) )
                    }
                }
                if(str.length!==7) sql += str;
                if(limit!=="" && limit_flag) sql += limit;
                console.log(sql);
                res.setHeader("Access-Control-Allow-Origin", "*")
                res.send(await Dosql(sql))
            })
        }
        app.listen(port,()=>{})
    }else{
        console.log("Check your API setting.Don't let id and port repeat.")
    }
}

