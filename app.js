import express from 'express';
import { TryAccess } from './function/AccessDataBase.js';
import { File } from './function/File.js';
import cors from 'cors';
import { StartServer,Router } from './function/Server.js';

export function Server(f){
    if(f){
        StartServer();
        app.use('/',Router);
        setTimeout(() => {
            File.SetTime();
        }, 50);
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

    Server(false);

    app.listen(port,()=>{})
}else{
    console.log("Check your API setting.Don't let id and port repeat.")
}

