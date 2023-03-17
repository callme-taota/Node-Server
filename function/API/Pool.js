import express from 'express';
import { GetTable } from './getTable.js';


export const SuperRouter =  express.Router();

SuperRouter.get(GetTable.getPort(),async(req,res)=>{
    GetTable.setQuery(req.query);
    let r = await GetTable.getRes();
    res.send(r);
})

