import express from 'express';
import { TryAccess } from './function/AccessDataBase.js';
import { Sys } from './function/Sys_fn.js';
import cors from 'cors';
import { StartServer,Router } from './function/Server.js';

export function Server(f){
    if(f){
        StartServer();
        app.use('/',Router);
        setTimeout(() => {
            Sys.SetStartTime();
        }, 50);
    }else{
        StartServer();
        app.use('/',Router);
    }
}

//get Server port
const port = Sys.getPort();
//start app
const app = express();
//solve cross
app.use(cors());

//check mysql connection
TryAccess();


let flag = Sys.CheckApi();

if(flag){
    Sys.SetStartTime();

    Server(false);

    app.listen(port,()=>{})
}else{
    console.log("Check your API setting.Don't let id and port repeat.")
}

