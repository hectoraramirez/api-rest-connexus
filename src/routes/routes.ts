import {Router} from 'express';
import {signin, login} from '../controllers/user.controller';
import {TokenValidations} from '../utils/tokenvalidator';

const router: Router = Router();

//rutas del usuario
router.route('/signup').post(signin);
router.route('/login').post(login);


export default router;