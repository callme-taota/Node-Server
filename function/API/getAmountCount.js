import { Dosql } from "../AccessDataBase.js";
import { Container } from "./Container.js";

export const getAmountCount = new Container("/getamountcount",async(q)=>{
    let sql =   `select CustomerID,sum(Amount) amount,year(OrderDate) year,month(OrderDate) month from orders o join orderitems o2 on o.OrderID = o2.OrderID
                where CustomerID="` +q.customerid +`" 
                group by CustomerID,month(OrderDate);`;
    console.log(sql);
    let res = await Dosql(sql);
    return res;
})