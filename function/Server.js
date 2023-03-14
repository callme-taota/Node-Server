import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { Sys } from './Sys_fn.js';
import { Dosql } from './AccessDataBase.js';
import { Server } from '../app.js';

export const Router =express.Router();
//getHTML path
const __pathName = fileURLToPath(import.meta.url)
const __dir2name = path.dirname(__pathName);
const rp = path.join(__dir2name,'../src');

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)
const jsonfile = path.join(__dirname,'./config.json')

//get api list    
let API = Sys.getAPIconfig();

export function StartServer(){

    Router.get('/getapilist',(req,res) => {
        res.send(Sys.getAPIconfig());
    })
    Router.use(express.static(rp))
    
    Router.get('/setjson',(req,res) => {
        let data = JSON.parse(req.query.data)
        Sys.UpdateTime();
        setTimeout(() => {
            Sys.SetAPISettings(data);
            res.send("OK");
            Server(true);
        },200);
    })

    for(let i = 0; i <API.length; i++) {
        let port = API[i].port;
        Router.get(port, async (req, res) => {
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
                    if(req.query[query[j]] && req.query[query[j]][0] === `"`){
                        str += query[j]+ `=`+ req.query[query[j]] + ' ';
                    }else if(req.query[query[j]]){
                        str += query[j]+ `="`+ req.query[query[j]] + '" ';
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
} 
