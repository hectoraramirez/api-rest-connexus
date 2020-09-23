import app from './app';
import { connectdb } from './databases';
    async function main (){
        connectdb();
        await app.listen(app.get('port'));
        console.log("server comport: ",app.get('port'));
    }
main();