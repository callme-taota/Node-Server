

export class Sys{
    static _readlineSync() {
        return new Promise((resolve, reject) => {
            process.stdin.resume();
            process.stdin.on('data', function (data) {
                process.stdin.pause();
                resolve(data);
            });
        });
    }
    
    static Input = async (info) => {
        console.log(info);
        let data = await this._readlineSync();
        data = data.toString().slice(0,-1);
        return data;
    }

}
