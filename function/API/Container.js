export class Container{
    constructor(p,f){
        this.p = p;
        this.f = f;
    }
    getRes(q){
        let res = this.f(q);
        return res;
    }
    getPort(){
        return this.p;
    }
}
