import express, { request } from 'express';


import { GetTable } from './getTable.js';
import { getAmountCount } from './getAmountCount.js';

export const SuperRouter =  express.Router();

SuperRouter.get(GetTable.getPort(),async(req,res)=>{
    let r = await GetTable.getRes(req.query);
    res.send(r);
})

SuperRouter.get(getAmountCount.getPort(),async(req,res)=>{
    let r = await getAmountCount.getRes(req.query);
    res.send(r);
})