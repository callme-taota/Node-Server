import express from 'express';
import { TryAccess , Dosql } from './function/AccessDataBase.js';
import { Sys } from './function/Sys_fn.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

//getHTML path
const __pathName = fileURLToPath(import.meta.url)
const __dir2name = path.dirname(__pathName);
const rp = path.join(__dir2name,'./src');

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)
const jsonfile = path.join(__dirname,'./function/config.json')

//get Server port
const port = Sys.getPort();

//start app
const app = express();

//solve cross
app.use(cors());

//check mysql connection
TryAccess();

//get api list
let API = Sys.getAPIconfig();

//api validity check
let flag = Sys.CheckApi(API);
if(flag){

    /* outmoded
    app.get('/', (req, res) => {
        res.sendFile(html1)
    })
    */

    app.get('/config.json',(req,res) => {
        res.sendFile(jsonfile)
    })
    app.get('/getapilist',(req,res) => {
        res.send(API)
    })
    app.use(express.static(rp))
    
    app.get('/setjson',(req,res) => {
        let data = JSON.parse(req.query.data)
        //!!! TODO 
        res.send("OK");
    })

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

