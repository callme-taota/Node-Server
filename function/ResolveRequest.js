import { Dosql } from "./AccessDataBase.js";
import { File } from "./File.js";
export async function RR(p,req){

    let a = File.getAPIconfig();
    let t = -1;
    for(let i=0;i<a.length;i++){
        if(a[i].port===p){
            t=i;
        }
    }
    if(t>=0){
        let sql = a[t].sql;
        let limit_flag= a[t].limit_flag;
        let str = "";
        let limit = "";
    
        let query=[];
        if(a[t].keyValue!=="" || a[t].keyValue!==null){
            query = a[t].keyValue.split(";");
        }
        
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
                limit += (parseInt(req.query.offset)) + " , " + (parseInt(req.query.limit))
            }
        }
    
        if(str.length!==7) sql += str;
        if(limit!=="" && limit_flag) sql += limit;
        console.log(sql);
        let res = await Dosql(sql);
        let len = res.length;
        let obj = {res,len}
        return obj;
    }else{
        let obj = {}
        return obj;
    }
    

}