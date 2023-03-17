export class Container{
    constructor(p,f){
        this.p = p;
        this.f = f;
    }
    setQuery(query){
        this.query = query;
    }
    getRes(){
        let res = this.f(this.query);
        return res;
    }
    getPort(){
        return this.p;
    }
}
