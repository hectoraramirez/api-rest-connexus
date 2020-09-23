import express from 'express';
import morgan from 'morgan';
import router from './routes/routes';

const app = express();

//configuracion
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//rutas
app.use('/api', router)

export default app;