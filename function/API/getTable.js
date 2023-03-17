import { Dosql } from '../AccessDataBase.js';
import { Container } from "./Container.js";

export const GetTable =new Container("/getTable",async (n)=>{
    let name = n.name;
    let sql = "select * from "+name ;
    console.log(sql)
    let res = await Dosql(sql);
    return res;
});