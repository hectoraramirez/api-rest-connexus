import {connect} from 'mongoose';

export async function connectdb(){
    await connect('mongodb://hectoraclsystems:H3ct0r83@ds263048.mlab.com:63048/messages-react', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then( db => console.log("Database is conected"))
    .catch( err => console.log(err));
}
