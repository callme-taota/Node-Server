import mysql from 'mysql';
import { Sys } from '../Sys_fn.js';
import { Dosql } from '../AccessDataBase.js';

export async function getTable(tablename){
    let obj = {
        result:null,
        code : 200,
        length: 0,
    }
    let sql = "select * from " + tablename
    let res = await Dosql(sql)
    obj.result = res
    obj.length = res.length
    return obj
}
