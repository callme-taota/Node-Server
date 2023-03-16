import express from 'express';
import { TryAccess } from './function/AccessDataBase.js';
import { File } from './function/File.js';
import cors from 'cors';
import { StartServer,Router } from './function/Server.js';
import { exec } from 'child_process';

export function Server(){
    StartServer();
    app.use('/',Router);
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
        Server();
        console.log("Start success")
        let s = "start http://localhost:" + port + "/";
        exec(s)
    }, 1000);
    

    app.listen(port,()=>{})
}else{
    console.log("Check your API setting.Don't let id and port repeat.")
}

