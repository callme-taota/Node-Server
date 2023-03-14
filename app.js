import express from 'express';
import { TryAccess } from './function/AccessDataBase.js';
import { File } from './function/File.js';
import cors from 'cors';
import { StartServer,Router } from './function/Server.js';

export function Server(f){
    if(f){
        StartServer();
        app.use('/',Router);
    }else{
        StartServer();
        app.use('/',Router);
    }
}

//get Server port
const port = File.getPort();
//start app
const app = express();
//solve cross
app.use(cors());

//check mysql connection
TryAccess();


let flag = File.CheckAPI();

if(flag){
    File.SetTime();
    console.log("Starting Setver");
    setTimeout(() => {
        Server(false);
        console.log("Start success")
    }, 1000);
    

    app.listen(port,()=>{})
}else{
    console.log("Check your API setting.Don't let id and port repeat.")
}

