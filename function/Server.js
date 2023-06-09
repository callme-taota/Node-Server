import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { File } from './File.js';
import { RR } from './ResolveRequest.js';

export const Router =express.Router();
//getHTML path
const __pathName = fileURLToPath(import.meta.url)
const __dir2name = path.dirname(__pathName);
const rp = path.join(__dir2name,'../src');


export function StartServer(){
    
    let API = File.getAPIconfig();
    Router.get('/getapilist',(req,res) => {
        res.send(File.getAPIconfig());
    })

    Router.use(express.static(rp))
    
    Router.get('/setjson',(req,res) => {
        console.log("Updating...")
        let data = JSON.parse(req.query.data)
        let obj = File.SetAPIconfig(data);
        res.send(obj);
        setTimeout(() => {
            StartServer();
        }, 1000);
        console.log("Update Successful")
    })

    for(let i = 0; i <API.length; i++) {
        let port = API[i].port;
        Router.get(port, async (req, res) => {
            let data = await RR(port,req);
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.send(data);
        })
    }
} 
